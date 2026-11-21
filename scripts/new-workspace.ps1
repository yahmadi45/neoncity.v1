[CmdletBinding()]
param(
    [Parameter(Mandatory = $true, Position = 0)]
    [ValidatePattern('^(feature|fix|chore|docs)/[a-z0-9][a-z0-9._-]*$')]
    [string]$Branch,

    [Parameter()]
    [string]$Path
)

$ErrorActionPreference = 'Stop'

if ($Branch -eq 'main' -or $Branch -notmatch '^(feature|fix|chore|docs)/') {
    throw 'Use a feature/<name>, fix/<name>, chore/<name>, or docs/<name> branch. Direct main work is disabled.'
}

$repoRoot = git rev-parse --show-toplevel
if ($LASTEXITCODE -ne 0 -or -not $repoRoot) {
    throw 'Run this script from inside the NeoCity Git repository.'
}
$repoRoot = [IO.Path]::GetFullPath($repoRoot.Trim())
$rootBranch = (git -C $repoRoot branch --show-current).Trim()
if ($rootBranch -eq 'main') {
    $originalStatus = git -C $repoRoot status --porcelain
    if ($originalStatus) {
        throw 'The original main worktree has local changes. Use an existing clean branch/worktree as the base so those changes remain untouched.'
    }
}

if (-not $Path) {
    $Path = Join-Path (Join-Path $HOME 'neoncity-worktrees') ($Branch -replace '/', '-')
}
$worktreePath = [IO.Path]::GetFullPath($Path)
if (Test-Path $worktreePath) {
    throw "Target path already exists: $worktreePath"
}

$branchExists = git -C $repoRoot branch --list $Branch
if ($branchExists) {
    throw "Branch already exists: $Branch. Use its existing worktree or choose a new branch name."
}

$null = git -C $repoRoot fetch origin main
if ($LASTEXITCODE -ne 0) {
    throw 'Could not fetch origin/main; no worktree was created.'
}
$baseCommit = (git -C $repoRoot rev-parse origin/main).Trim()
if ($LASTEXITCODE -ne 0 -or -not $baseCommit) {
    throw 'Could not resolve origin/main; no worktree was created.'
}

$null = git -C $repoRoot -c 'lfs.fetchexclude=*.mp4' worktree add -b $Branch $worktreePath $baseCommit
if ($LASTEXITCODE -ne 0) {
    throw 'Worktree creation failed. The original worktree was not modified.'
}

Write-Output "Created isolated worktree: $worktreePath"
Write-Output "Branch: $Branch"
Write-Output "Base: origin/main ($baseCommit)"
Write-Output 'Next: edit only this worktree, run its checks, commit, push this branch, and open a pull request to main.'
