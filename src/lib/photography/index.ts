export default Object.entries(
  import.meta.glob<string>('./**/*.{jpg,png,JPG,PNG}', {
    eager: true,
    query: '?url',
    import: 'default',
  }),
).map(it => it[1]).toSorted((a, b) => a < b ? 1 : -1);