#!/usr/bin/env sh
"\"",`$(echo --% ' |out-null)" >$null;function :{};function dv{<#${/*'>/dev/null )` 2>/dev/null;dv() { #>
echo "1.42.1"; : --% ' |out-null <#'; }; version="$(dv)"; deno="$HOME/.deno/$version/bin/deno"; if [ -x "$deno" ]; then  exec "$deno" run -q -A --no-lock "$0" "$@";  elif [ -f "$deno" ]; then  chmod +x "$deno" && exec "$deno" run -q -A --no-lock "$0" "$@";  fi; bin_dir="$HOME/.deno/$version/bin"; exe="$bin_dir/deno"; has () { command -v "$1" >/dev/null; } ;  if ! has unzip; then if ! has apt-get; then  has brew && brew install unzip; else  if [ "$(whoami)" = "root" ]; then  apt-get install unzip -y; elif has sudo; then  echo "Can I install unzip for you? (its required for this command to work) ";read ANSWER;echo;  if [ "$ANSWER" = "y" ] || [ "$ANSWER" = "yes" ] || [ "$ANSWER" = "Y" ]; then  sudo apt-get install unzip -y; fi; elif has doas; then  echo "Can I install unzip for you? (its required for this command to work) ";read ANSWER;echo;  if [ "$ANSWER" = "y" ] || [ "$ANSWER" = "yes" ] || [ "$ANSWER" = "Y" ]; then  doas apt-get install unzip -y; fi; fi;  fi;  fi;  if ! has unzip; then  echo ""; echo "So I couldn't find an 'unzip' command"; echo "And I tried to auto install it, but it seems that failed"; echo "(This script needs unzip and either curl or wget)"; echo "Please install the unzip command manually then re-run this script"; exit 1;  fi;  repo="denoland/deno"; if [ "$OS" = "Windows_NT" ]; then target="x86_64-pc-windows-msvc"; else :;  case $(uname -sm) in "Darwin x86_64") target="x86_64-apple-darwin" ;; "Darwin arm64") target="aarch64-apple-darwin" ;; "Linux aarch64") repo="LukeChannings/deno-arm64" target="linux-arm64" ;; "Linux armhf") echo "deno sadly doesn't support 32-bit ARM. Please check your hardware and possibly install a 64-bit operating system." exit 1 ;; *) target="x86_64-unknown-linux-gnu" ;; esac; fi; deno_uri="https://github.com/$repo/releases/download/v$version/deno-$target.zip"; exe="$bin_dir/deno"; if [ ! -d "$bin_dir" ]; then mkdir -p "$bin_dir"; fi;  if ! curl --fail --location --progress-bar --output "$exe.zip" "$deno_uri"; then if ! wget --output-document="$exe.zip" "$deno_uri"; then echo "Howdy! I looked for the 'curl' and for 'wget' commands but I didn't see either of them. Please install one of them, otherwise I have no way to install the missing deno version needed to run this code"; exit 1; fi; fi; unzip -d "$bin_dir" -o "$exe.zip"; chmod +x "$exe"; rm "$exe.zip"; exec "$deno" run -q -A --no-lock "$0" "$@"; #>}; $DenoInstall = "${HOME}/.deno/$(dv)"; $BinDir = "$DenoInstall/bin"; $DenoExe = "$BinDir/deno.exe"; if (-not(Test-Path -Path "$DenoExe" -PathType Leaf)) { $DenoZip = "$BinDir/deno.zip"; $DenoUri = "https://github.com/denoland/deno/releases/download/v$(dv)/deno-x86_64-pc-windows-msvc.zip";  [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12;  if (!(Test-Path $BinDir)) { New-Item $BinDir -ItemType Directory | Out-Null; };  Function Test-CommandExists { Param ($command); $oldPreference = $ErrorActionPreference; $ErrorActionPreference = "stop"; try {if(Get-Command "$command"){RETURN $true}} Catch {Write-Host "$command does not exist"; RETURN $false}; Finally {$ErrorActionPreference=$oldPreference}; };  if (Test-CommandExists curl) { curl -Lo $DenoZip $DenoUri; } else { curl.exe -Lo $DenoZip $DenoUri; };  if (Test-CommandExists curl) { tar xf $DenoZip -C $BinDir; } else { tar -Lo $DenoZip $DenoUri; };  Remove-Item $DenoZip;  $User = [EnvironmentVariableTarget]::User; $Path = [Environment]::GetEnvironmentVariable('Path', $User); if (!(";$Path;".ToLower() -like "*;$BinDir;*".ToLower())) { [Environment]::SetEnvironmentVariable('Path', "$Path;$BinDir", $User); $Env:Path += ";$BinDir"; } }; & "$DenoExe" run -q -A --no-lock "$PSCommandPath" @args; Exit $LastExitCode; <# 
# */0}`;
import { FileSystem } from "https://deno.land/x/quickr@0.7.6/main/file_system.js"
import { Console, bold, lightRed, yellow } from "https://deno.land/x/quickr@0.7.6/main/console.js"
import $ from "https://deno.land/x/dax@0.39.2/mod.ts"
import { pureBinaryify } from "https://deno.land/x/binaryify@2.5.5.0/tools.js"
import { toEsm } from "https://deno.land/x/to_esm@0.0.4.0/main/impure_api.js"


const deno = Deno.execPath()
// 
// get latest version string
// 
let treeSitterCodeBundle = await $`${deno} run -A https://raw.githubusercontent.com/jeff-hykin/deno_bundle/a87f6f782c0f014aa288c12da57d32aae2359a90/main.js https://esm.sh/web-tree-sitter`.text("stdout")
let versionMatch = treeSitterCodeBundle.match(/.+web-tree-sitter@(.+?)\/denonext/)
let version = versionMatch[1]
if (!versionMatch || !versionMatch[1]) {
    throw new Error(`\nI normally pull the version from first line of the downloaded tree-sitter code\n(esm.sh downloads the latest),\nbut I couldn't find the version on that line:\n${treeSitterCode.split("\n")[0]}\n\n`)
}

// 
// get all the source files
// 
const sourceFileNames = [
    "bindings.ts",
    "constants.ts",
    "index.ts",
    "language.ts",
    "lookahead_iterator.ts",
    "marshal.ts",
    "node.ts",
    "parser.ts",
    "query.ts",
    "tree.ts",
    "tree_cursor.ts",
]
const srcParentPath = `${FileSystem.thisFolder}/../main/tree_sitter/`
for (const eachFileName of sourceFileNames) {
    // https://raw.githubusercontent.com/tree-sitter/tree-sitter/refs/heads/master/lib/binding_web/src/index.ts
    let data = await (await fetch(`https://raw.githubusercontent.com/tree-sitter/tree-sitter/refs/heads/master/lib/binding_web/src/${eachFileName}`)).arrayBuffer()
    data = new Uint8Array(data)
    await FileSystem.write({
        data,
        path:`${srcParentPath}/${eachFileName}`,
    })
}

// 
// fix the import paths (they're not fully qualified)
// 
for (const eachFileName of sourceFileNames) {
    const eachPath = `${srcParentPath}/${eachFileName}`
    await FileSystem.write({
        path: eachPath,
        data: await toEsm({
            path: eachPath, 
            // customConverter: (importPathString, path) => {
            //     // convert all npm stuff to esm.sh
            //     if (importPathString.startsWith("npm:")) {
            //         return JSON.stringify("https://esm.sh/${importPathString.slice(4)}")
            //     }
            //     if (importPathString === "b") {
            //         return JSON.stringify("https://deno.land/x/a@1.2.3/mod.js")+" // CHECKME "
            //     } 
            // },
            // if you want to hack an edge case for your own project
            handleUnhandlable: (requireArgs, statementText, statement) => {
                // if the require args are "b" or 'b'
                // if (requireArgs.match(/("|')b(\1)/)) {
                //     return `import { a } from "https://deno.land/x/a@1.2.3/mod.js" // CHECKME`
                // }
                console.debug(`requireArgs is:`,requireArgs)
            },
        }),
    })
}


// 
// get the wasm
// 
    // // fetch(`https://github.com/tree-sitter/tree-sitter/releases/download/v${version}/tree-sitter.wasm`)
    // let url = `https://github.com/tree-sitter/tree-sitter/releases/download/v${version}/tree-sitter.wasm`
    // let data
    // try {
    //     data = await (await fetch(url)).arrayBuffer()
    // } catch (error) {
    //     throw Error(`I tried to download the wasm file for the tree sitter version ${version}, but it failed. Make sure the URL exists: ${url}`)
    // }

    // // const treeSitterPath = `${FileSystem.thisFolder}/../tree_sitter.js`
    // const treeSitterWasmPath = `${FileSystem.thisFolder}/../main/tree_sitter_wasm.js`
    // FileSystem.write({
    //     path: treeSitterWasmPath,
    //     data: pureBinaryify(data),
    // })

// (this comment is part of deno-guillotine, dont remove) #>