import { kv } from "@vercel/kv";

export type BannerId = "left" | "right";

interface DailyStats {
  date: string;
  clicks: number;
  hourly: Record<string, number>;
}

interface BannerStats {
  bannerId: BannerId;
  totalClicks: number;
  daily: DailyStats[];
}

function getKSTDate(): string {
  const now = new Date();
  const kstOffset = 9 * 60 * 60 * 1000;
  const kstTime = new Date(now.getTime() + kstOffset);
  return kstTime.toISOString().split("T")[0];
}

function getKSTHour(): string {
  const now = new Date();
  const kstOffset = 9 * 60 * 60 * 1000;
  const kstTime = new Date(now.getTime() + kstOffset);
  return kstTime.getUTCHours().toString().padStart(2, "0");
}

export async function recordBannerClick(bannerId: BannerId): Promise<number> {
  const date = getKSTDate();
  const hour = getKSTHour();

  const totalKey = `banner:clicks:${bannerId}`;
  const dailyKey = `banner:daily:${bannerId}:${date}`;

  const [totalClicks] = await Promise.all([
    kv.incr(totalKey),
    kv.hincrby(dailyKey, hour, 1),
    kv.expire(dailyKey, 60 * 60 * 24 * 90), // 90일 후 만료
  ]);

  return totalClicks;
}

export async function getBannerStats(
  bannerId: BannerId,
  days: number = 7
): Promise<BannerStats> {
  const totalKey = `banner:clicks:${bannerId}`;
  const totalClicks = (await kv.get<number>(totalKey)) || 0;

  const dates: string[] = [];
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const kstOffset = 9 * 60 * 60 * 1000;
    const kstTime = new Date(date.getTime() + kstOffset);
    dates.push(kstTime.toISOString().split("T")[0]);
  }

  const dailyStatsPromises = dates.map(async (date) => {
    const dailyKey = `banner:daily:${bannerId}:${date}`;
    const hourlyData = (await kv.hgetall<Record<string, number>>(dailyKey)) || {};

    const clicks = Object.values(hourlyData).reduce((sum, count) => sum + count, 0);

    return {
      date,
      clicks,
      hourly: hourlyData,
    };
  });

  const daily = await Promise.all(dailyStatsPromises);

  return {
    bannerId,
    totalClicks,
    daily: daily.reverse(), // 오래된 날짜부터 정렬
  };
}

export async function getAllBannerStats(days: number = 7): Promise<{
  left: BannerStats;
  right: BannerStats;
}> {
  const [left, right] = await Promise.all([
    getBannerStats("left", days),
    getBannerStats("right", days),
  ]);

  return { left, right };
}
