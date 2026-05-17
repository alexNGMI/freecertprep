import * as TooltipPrimitive from '@radix-ui/react-tooltip'

export function Tooltip({ children, content }) {
  return (
    <TooltipPrimitive.Provider delayDuration={250}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            sideOffset={8}
            className="z-50 rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-xs font-semibold text-zinc-200 shadow-2xl"
          >
            {content}
            <TooltipPrimitive.Arrow className="fill-zinc-950" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}
