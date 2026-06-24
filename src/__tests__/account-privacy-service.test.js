// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from 'vitest'

const { auth, rpc } = vi.hoisted(() => ({
  auth: { signOut: vi.fn() },
  rpc: vi.fn(),
}))

vi.mock('../lib/supabase', () => ({
  isSupabaseConfigured: true,
  supabase: { auth, rpc },
}))

import { deleteAccount, exportAccountData } from '../lib/accountPrivacy'

describe('account privacy service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    auth.signOut.mockResolvedValue({ error: null })
  })

  it('downloads the complete account export returned by Supabase', async () => {
    rpc.mockResolvedValue({
      data: { schemaVersion: 1, account: { email: 'learner@example.com' }, studySnapshots: [] },
      error: null,
    })
    const createObjectURL = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:account-export')
    const revokeObjectURL = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {})
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {})

    await exportAccountData()

    expect(rpc).toHaveBeenCalledWith('export_my_account_data')
    expect(createObjectURL).toHaveBeenCalled()
    expect(click).toHaveBeenCalled()
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:account-export')
  })

  it('deletes the authenticated account and clears the local auth session', async () => {
    rpc.mockResolvedValue({ data: true, error: null })

    await expect(deleteAccount()).resolves.toBe(true)
    expect(rpc).toHaveBeenCalledWith('delete_my_account')
    expect(auth.signOut).toHaveBeenCalledWith({ scope: 'local' })
  })
})
