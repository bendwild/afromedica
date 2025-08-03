function toggleCallout(this: HTMLElement) {
  const callout = this.closest(".callout")
  if (!callout) return
  callout.classList.toggle("is-collapsed")
}

function setupCallout() {
  const callouts = document.querySelectorAll<HTMLElement>(".callout.is-collapsible")

  for (const callout of callouts) {
    // Ensure all callouts start collapsed
    callout.classList.add("is-collapsed")

    callout.addEventListener("click", (e) => {
      const target = e.target as HTMLElement
      // Prevent toggle if a link or its child was clicked
      if (target.closest("a")) return
      toggleCallout.call(callout)
    })

    // Register cleanup if supported
    window.addCleanup?.(() => callout.removeEventListener("click", toggleCallout))
  }
}

document.addEventListener("nav", setupCallout)
