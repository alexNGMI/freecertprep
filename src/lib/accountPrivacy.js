import { isSupabaseConfigured, supabase } from './supabase'

function downloadJSON(filename, data) {
  if (typeof document === 'undefined' || typeof URL === 'undefined') return false

  try {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = filename
    anchor.click()
    URL.revokeObjectURL(url)
    return true
  } catch {
    return false
  }
}

export async function exportAccountData() {
  if (!isSupabaseConfigured || !supabase) throw new Error('The account service is unavailable.')

  const { data, error } = await supabase.rpc('export_my_account_data')
  if (error) throw error
  if (!data) throw new Error('No account data was returned.')

  const downloaded = downloadJSON(
    `freecertprep-account-data-${new Date().toISOString().slice(0, 10)}.json`,
    data,
  )
  if (!downloaded) throw new Error('This browser could not download the account export.')
  return data
}

export async function deleteAccount() {
  if (!isSupabaseConfigured || !supabase) throw new Error('The account service is unavailable.')

  const { data, error } = await supabase.rpc('delete_my_account')
  if (error) throw error
  if (!data) throw new Error('The account could not be deleted.')

  await supabase.auth.signOut({ scope: 'local' })
  return true
}
