'use server'

export type ApplicationState = { status: 'idle' | 'success' | 'error'; name?: string }

export async function submitApplication(
  _prev: ApplicationState,
  formData: FormData,
): Promise<ApplicationState> {
  const name = String(formData.get('name') ?? '').trim().slice(0, 100)
  const phone = String(formData.get('phone') ?? '').trim()

  if (!phone) return { status: 'error' }

  // No storage is connected yet; applications are acknowledged but not persisted.
  return { status: 'success', name }
}
