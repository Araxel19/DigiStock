import { reactive, readonly } from 'vue'

type Toast = { id: number; title?: string; message: string; type?: 'info'|'success'|'error'; duration?: number }

const state = reactive<{ toasts: Toast[] }>({ toasts: [] })
let idSeq = 1

export function useToastStore() {
  function show(msg: string, opts: Partial<Toast> = {}) {
    const id = idSeq++
    const toast: Toast = { id, title: opts.title || '', message: msg, type: opts.type || 'info', duration: opts.duration ?? 4000 }
    state.toasts.push(toast)
    if (toast.duration! > 0) {
      setTimeout(() => remove(id), toast.duration)
    }
    return id
  }

  function success(msg: string, title?: string, duration?: number) {
    return show(msg, { type: 'success', title: title || 'Éxito', duration })
  }

  function error(msg: string, title?: string, duration?: number) {
    return show(msg, { type: 'error', title: title || 'Error', duration })
  }

  function remove(id: number) {
    const idx = state.toasts.findIndex(t => t.id === id)
    if (idx >= 0) state.toasts.splice(idx, 1)
  }

  return {
    toasts: readonly(state.toasts) as unknown as Toast[],
    show,
    success,
    error,
    remove,
  }
}
