# Answer-key corrections made during explanation backfill

These questions had a clearly-incorrect keyed answer discovered while
writing explanations. Key fixed + explanation written accordingly.

- netplus-326: "average time required to restore a failed component" was
  keyed RTO; corrected to MTTR (RTO is a target, not a measured average).
- netplus-405: unencrypted LDAP port was keyed 443; corrected to 389
  (443 is HTTPS; LDAP is 389).
- netplus-630: "forward a local port over an existing SSH connection"
  was keyed "Reverse proxy"; corrected to "SSH tunneling (port
  forwarding)".
- netplus-722: "prevent an unauthorized switch from winning the STP
  root election" was keyed "PortFast"; corrected to "Root Guard".
- netplus-744: matching - Root Guard and Loop Guard descriptions were
  swapped in correctMatches; corrected ([3,0,1,2] -> [3,0,2,1]).
- serverplus-423: split-tunneling trade-off was keyed "encrypts more
  than full-tunnel" (false - it encrypts less); corrected to the
  performance/visibility trade-off option.
- serverplus-681: "exact block-level copy of a boot drive" was keyed
  "format and reinstall from scratch"; corrected to the Clonezilla/dd
  imaging option.
