export default function seasonAndEpisode (string) {
  const season = parseInt(string.slice(1))
  const episode = parseInt(string.slice(4))

  return `season ${season} • episode ${episode}`
}
