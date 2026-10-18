#!/usr/bin/env python3
"""Push the fixed app-v24.js to GitHub main via the Git Data API.

Context: local commit 063f009 fixes a TDZ ReferenceError in wireButtons()
(onBtn() was called before its `const` declaration, which threw on app
startup and killed ALL editor toolbar buttons + the category->editor
deep link). The file on GitHub (commit 144d494e) is byte-identical to the
buggy local 14592cf. This script replaces ONLY app-v24.js on top of the
current GitHub HEAD (fast-forward; aborts if main moved).

Run from the MAIN agent — write calls are DENIED in background preparation.
After the push, Vercel auto-deploys from main (~1-2 min).

Usage:  python3 push-fix-tdz.py
"""
import base64
import json
import subprocess
import sys

GH = "/home/hatch/workspace/custom-connectors/custom.github/bin/gh_api.py"
REPO = "irfanfath123/mewarnai-balita"
FILE = "/home/hatch/workspace/pwa-mewarnai-balita/app-v24.js"
EXPECTED_HEAD = "144d494ee241a3eb6b8f416725e38a74e6a0edaf"
BASE_TREE = "e03dd663a73b886146e581e69d935bffef3ebd71"


def api(method, path, body=None):
    cmd = [GH, method, path] + ([json.dumps(body)] if body is not None else [])
    r = subprocess.run(cmd, capture_output=True, text=True, timeout=120)
    if r.returncode != 0:
        print(f"API {method} {path} FAILED:\n{r.stderr}", file=sys.stderr)
        sys.exit(1)
    return json.loads(r.stdout)


def main():
    ref = api("GET", f"/repos/{REPO}/git/refs/heads/main")
    head = ref["object"]["sha"]
    print("GitHub main is at:", head)
    if head != EXPECTED_HEAD:
        print(f"ABORT: main moved since research (expected {EXPECTED_HEAD}).",
              file=sys.stderr)
        print("Investigate before pushing — do not force.", file=sys.stderr)
        sys.exit(2)

    data = open(FILE, "rb").read()
    blob = api("POST", f"/repos/{REPO}/git/blobs",
               {"content": base64.b64encode(data).decode(), "encoding": "base64"})
    print("blob:", blob["sha"])

    tree = api("POST", f"/repos/{REPO}/git/trees",
               {"base_tree": BASE_TREE,
                "tree": [{"path": "app-v24.js", "mode": "100644",
                          "type": "blob", "sha": blob["sha"]}]})
    print("tree:", tree["sha"])

    commit = api("POST", f"/repos/{REPO}/git/commits",
                 {"message": "Fix: deklarasi onBtn dipindah ke atas wireButtons "
                             "(TDZ ReferenceError mematikan semua tombol)",
                  "tree": tree["sha"], "parents": [head]})
    print("commit:", commit["sha"])

    upd = api("PATCH", f"/repos/{REPO}/git/refs/heads/main",
              {"sha": commit["sha"]})
    print("ref now at:", upd["object"]["sha"])
    print("DONE — Vercel will auto-deploy from main in ~1-2 min.")


if __name__ == "__main__":
    main()
