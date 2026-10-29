<script lang="ts">
  import { onMount } from "svelte";

  import { formatFullLocalDateTime, formatMediumLocalDate, formatMediumUtcDate } from "@/lib/date";

  interface Props {
    date: Date;
  }

  const { date }: Props = $props();

  const utcFormattedTitle = $derived(formatFullLocalDateTime(date));
  const utcFormattedValue = $derived(formatMediumUtcDate(date));

  let localFormattedTitle: string | null = $state(null);
  let localFormattedValue: string | null = $state(null);

  const isoString = $derived(date.toISOString());

  onMount(() => {
    localFormattedTitle = formatFullLocalDateTime(date);
    localFormattedValue = formatMediumLocalDate(date);
  });
</script>

<time datetime={isoString} title={localFormattedTitle ?? utcFormattedTitle}>
  {localFormattedValue ?? utcFormattedValue}
</time>
