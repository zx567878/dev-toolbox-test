import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * front-matter 的日期一律按 **北京时间（UTC+8）墙上时间** 解析。
 *
 * 不能依赖构建机器的本地时区：本机是 UTC+8，GitHub Actions 是 UTC，
 * 同一篇文章在两边会差 8 小时，跨零点就直接错一天。
 * 这里固定 +08:00 偏移，任何机器、任何地区构建出的时间戳完全一致。
 */
const SITE_UTC_OFFSET = '+08:00';

function parseLocalDate(value: string | Date): Date {
  if (value instanceof Date) {
    // js-yaml 已把无时区的时间按 UTC 解析，取回各字段后重新按 +08:00 组装
    const p = (n: number) => String(n).padStart(2, '0');
    const iso =
      `${value.getUTCFullYear()}-${p(value.getUTCMonth() + 1)}-${p(value.getUTCDate())}` +
      `T${p(value.getUTCHours())}:${p(value.getUTCMinutes())}:${p(value.getUTCSeconds())}`;
    return new Date(iso + SITE_UTC_OFFSET);
  }
  const s = String(value).trim().replace(' ', 'T');
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return new Date(`${s}T00:00:00${SITE_UTC_OFFSET}`);
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?$/.test(s)) {
    const withSeconds = /T\d{2}:\d{2}:\d{2}$/.test(s) ? s : `${s}:00`;
    return new Date(withSeconds + SITE_UTC_OFFSET);
  }
  return new Date(s);
}

const dateField = z.union([z.string(), z.date()]).transform(parseLocalDate);

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: dateField,
    updated: dateField.optional(),
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),
    categories: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
