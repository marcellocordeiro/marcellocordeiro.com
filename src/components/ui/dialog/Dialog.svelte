<script lang="ts">
  import type { MouseEventHandler } from "svelte/elements";

  import Button from "@/components/ui/button/Button.svelte";
  import { XIcon } from "@/config/icons.svelte.ts";

  let dialog: HTMLDialogElement | null = null;
  let isOpen = $state(false);

  $effect(() => {
    if (isOpen) {
      dialog?.showModal();
    } else {
      dialog?.close();
    }
  });

  function handleOpen() {
    isOpen = true;
  }

  function handleClose() {
    isOpen = false;
  }

  const handleClick: MouseEventHandler<HTMLDialogElement> = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    ) {
      event.currentTarget.close();
    }
  };
</script>

<Button onclick={handleOpen}>Open dialog</Button>

<dialog
  bind:this={dialog}
  onclose={handleClose}
  onclick={handleClick}
  closedby="any"
>
  <Button
    variant="ghost"
    class="absolute top-4 right-4 bg-secondary"
    size="icon-sm"
    onclick={handleClose}
  >
    <XIcon />
    <span class="sr-only">Close</span>
  </Button>
  <div class={["  "]}>
    <p>Native dialog content</p>
    <Button onclick={handleClose}>Close</Button>
  </div>
</dialog>

<style lang="postcss">
  @reference "@/styles/globals.css";

  dialog {
    @apply w-full max-w-[calc(100%-2rem)] gap-6 rounded-4xl bg-popover p-6 text-sm text-popover-foreground shadow-xl ring-1 ring-foreground/5 outline-none sm:max-w-md dark:ring-foreground/10;

    transition: opacity, overlay, display, scale;
    transition-behavior: allow-discrete;

    @apply duration-200;

    &::backdrop {
      @apply bg-black/30 backdrop-blur-sm;

      transition: opacity, overlay, display;
      transition-behavior: allow-discrete;

      @apply duration-100;
    }

    @starting-style {
      opacity: 0;
      scale: 95%;

      &::backdrop {
        opacity: 0;
      }
    }

    &:not([open]) {
      opacity: 0;
      scale: 95%;

      &::backdrop {
        opacity: 0;
      }
    }
  }
</style>
