require('./sourcemap-register.js');module.exports=(()=>{"use strict";var e={351:function(e,t,i){var n=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var i in e)if(Object.hasOwnProperty.call(e,i))t[i]=e[i];t["default"]=e;return t};Object.defineProperty(t,"__esModule",{value:true});const s=n(i(87));const r=i(278);function issueCommand(e,t,i){const n=new Command(e,t,i);process.stdout.write(n.toString()+s.EOL)}t.issueCommand=issueCommand;function issue(e,t=""){issueCommand(e,{},t)}t.issue=issue;const o="::";class Command{constructor(e,t,i){if(!e){e="missing.command"}this.command=e;this.properties=t;this.message=i}toString(){let e=o+this.command;if(this.properties&&Object.keys(this.properties).length>0){e+=" ";let t=true;for(const i in this.properties){if(this.properties.hasOwnProperty(i)){const n=this.properties[i];if(n){if(t){t=false}else{e+=","}e+=`${i}=${escapeProperty(n)}`}}}}e+=`${o}${escapeData(this.message)}`;return e}}function escapeData(e){return r.toCommandValue(e).replace(/%/g,"%25").replace(/\r/g,"%0D").replace(/\n/g,"%0A")}function escapeProperty(e){return r.toCommandValue(e).replace(/%/g,"%25").replace(/\r/g,"%0D").replace(/\n/g,"%0A").replace(/:/g,"%3A").replace(/,/g,"%2C")}},186:function(e,t,i){var n=this&&this.__awaiter||function(e,t,i,n){function adopt(e){return e instanceof i?e:new i(function(t){t(e)})}return new(i||(i=Promise))(function(i,s){function fulfilled(e){try{step(n.next(e))}catch(e){s(e)}}function rejected(e){try{step(n["throw"](e))}catch(e){s(e)}}function step(e){e.done?i(e.value):adopt(e.value).then(fulfilled,rejected)}step((n=n.apply(e,t||[])).next())})};var s=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var i in e)if(Object.hasOwnProperty.call(e,i))t[i]=e[i];t["default"]=e;return t};Object.defineProperty(t,"__esModule",{value:true});const r=i(351);const o=i(717);const u=i(278);const c=s(i(87));const a=s(i(622));var l;(function(e){e[e["Success"]=0]="Success";e[e["Failure"]=1]="Failure"})(l=t.ExitCode||(t.ExitCode={}));function exportVariable(e,t){const i=u.toCommandValue(t);process.env[e]=i;const n=process.env["GITHUB_ENV"]||"";if(n){const t="_GitHubActionsFileCommandDelimeter_";const n=`${e}<<${t}${c.EOL}${i}${c.EOL}${t}`;o.issueCommand("ENV",n)}else{r.issueCommand("set-env",{name:e},i)}}t.exportVariable=exportVariable;function setSecret(e){r.issueCommand("add-mask",{},e)}t.setSecret=setSecret;function addPath(e){const t=process.env["GITHUB_PATH"]||"";if(t){o.issueCommand("PATH",e)}else{r.issueCommand("add-path",{},e)}process.env["PATH"]=`${e}${a.delimiter}${process.env["PATH"]}`}t.addPath=addPath;function getInput(e,t){const i=process.env[`INPUT_${e.replace(/ /g,"_").toUpperCase()}`]||"";if(t&&t.required&&!i){throw new Error(`Input required and not supplied: ${e}`)}return i.trim()}t.getInput=getInput;function setOutput(e,t){r.issueCommand("set-output",{name:e},t)}t.setOutput=setOutput;function setCommandEcho(e){r.issue("echo",e?"on":"off")}t.setCommandEcho=setCommandEcho;function setFailed(e){process.exitCode=l.Failure;error(e)}t.setFailed=setFailed;function isDebug(){return process.env["RUNNER_DEBUG"]==="1"}t.isDebug=isDebug;function debug(e){r.issueCommand("debug",{},e)}t.debug=debug;function error(e){r.issue("error",e instanceof Error?e.toString():e)}t.error=error;function warning(e){r.issue("warning",e instanceof Error?e.toString():e)}t.warning=warning;function info(e){process.stdout.write(e+c.EOL)}t.info=info;function startGroup(e){r.issue("group",e)}t.startGroup=startGroup;function endGroup(){r.issue("endgroup")}t.endGroup=endGroup;function group(e,t){return n(this,void 0,void 0,function*(){startGroup(e);let i;try{i=yield t()}finally{endGroup()}return i})}t.group=group;function saveState(e,t){r.issueCommand("save-state",{name:e},t)}t.saveState=saveState;function getState(e){return process.env[`STATE_${e}`]||""}t.getState=getState},717:function(e,t,i){var n=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var i in e)if(Object.hasOwnProperty.call(e,i))t[i]=e[i];t["default"]=e;return t};Object.defineProperty(t,"__esModule",{value:true});const s=n(i(747));const r=n(i(87));const o=i(278);function issueCommand(e,t){const i=process.env[`GITHUB_${e}`];if(!i){throw new Error(`Unable to find environment variable for file command ${e}`)}if(!s.existsSync(i)){throw new Error(`Missing file at path: ${i}`)}s.appendFileSync(i,`${o.toCommandValue(t)}${r.EOL}`,{encoding:"utf8"})}t.issueCommand=issueCommand},278:(e,t)=>{Object.defineProperty(t,"__esModule",{value:true});function toCommandValue(e){if(e===null||e===undefined){return""}else if(typeof e==="string"||e instanceof String){return e}return JSON.stringify(e)}t.toCommandValue=toCommandValue},514:function(e,t,i){var n=this&&this.__awaiter||function(e,t,i,n){function adopt(e){return e instanceof i?e:new i(function(t){t(e)})}return new(i||(i=Promise))(function(i,s){function fulfilled(e){try{step(n.next(e))}catch(e){s(e)}}function rejected(e){try{step(n["throw"](e))}catch(e){s(e)}}function step(e){e.done?i(e.value):adopt(e.value).then(fulfilled,rejected)}step((n=n.apply(e,t||[])).next())})};var s=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var i in e)if(Object.hasOwnProperty.call(e,i))t[i]=e[i];t["default"]=e;return t};Object.defineProperty(t,"__esModule",{value:true});const r=s(i(159));function exec(e,t,i){return n(this,void 0,void 0,function*(){const n=r.argStringToArray(e);if(n.length===0){throw new Error(`Parameter 'commandLine' cannot be null or empty.`)}const s=n[0];t=n.slice(1).concat(t||[]);const o=new r.ToolRunner(s,t,i);return o.exec()})}t.exec=exec},159:function(e,t,i){var n=this&&this.__awaiter||function(e,t,i,n){function adopt(e){return e instanceof i?e:new i(function(t){t(e)})}return new(i||(i=Promise))(function(i,s){function fulfilled(e){try{step(n.next(e))}catch(e){s(e)}}function rejected(e){try{step(n["throw"](e))}catch(e){s(e)}}function step(e){e.done?i(e.value):adopt(e.value).then(fulfilled,rejected)}step((n=n.apply(e,t||[])).next())})};var s=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var i in e)if(Object.hasOwnProperty.call(e,i))t[i]=e[i];t["default"]=e;return t};Object.defineProperty(t,"__esModule",{value:true});const r=s(i(87));const o=s(i(614));const u=s(i(129));const c=s(i(622));const a=s(i(436));const l=s(i(962));const f=process.platform==="win32";class ToolRunner extends o.EventEmitter{constructor(e,t,i){super();if(!e){throw new Error("Parameter 'toolPath' cannot be null or empty.")}this.toolPath=e;this.args=t||[];this.options=i||{}}_debug(e){if(this.options.listeners&&this.options.listeners.debug){this.options.listeners.debug(e)}}_getCommandString(e,t){const i=this._getSpawnFileName();const n=this._getSpawnArgs(e);let s=t?"":"[command]";if(f){if(this._isCmdFile()){s+=i;for(const e of n){s+=` ${e}`}}else if(e.windowsVerbatimArguments){s+=`"${i}"`;for(const e of n){s+=` ${e}`}}else{s+=this._windowsQuoteCmdArg(i);for(const e of n){s+=` ${this._windowsQuoteCmdArg(e)}`}}}else{s+=i;for(const e of n){s+=` ${e}`}}return s}_processLineBuffer(e,t,i){try{let n=t+e.toString();let s=n.indexOf(r.EOL);while(s>-1){const e=n.substring(0,s);i(e);n=n.substring(s+r.EOL.length);s=n.indexOf(r.EOL)}t=n}catch(e){this._debug(`error processing line. Failed with error ${e}`)}}_getSpawnFileName(){if(f){if(this._isCmdFile()){return process.env["COMSPEC"]||"cmd.exe"}}return this.toolPath}_getSpawnArgs(e){if(f){if(this._isCmdFile()){let t=`/D /S /C "${this._windowsQuoteCmdArg(this.toolPath)}`;for(const i of this.args){t+=" ";t+=e.windowsVerbatimArguments?i:this._windowsQuoteCmdArg(i)}t+='"';return[t]}}return this.args}_endsWith(e,t){return e.endsWith(t)}_isCmdFile(){const e=this.toolPath.toUpperCase();return this._endsWith(e,".CMD")||this._endsWith(e,".BAT")}_windowsQuoteCmdArg(e){if(!this._isCmdFile()){return this._uvQuoteCmdArg(e)}if(!e){return'""'}const t=[" ","\t","&","(",")","[","]","{","}","^","=",";","!","'","+",",","`","~","|","<",">",'"'];let i=false;for(const n of e){if(t.some(e=>e===n)){i=true;break}}if(!i){return e}let n='"';let s=true;for(let t=e.length;t>0;t--){n+=e[t-1];if(s&&e[t-1]==="\\"){n+="\\"}else if(e[t-1]==='"'){s=true;n+='"'}else{s=false}}n+='"';return n.split("").reverse().join("")}_uvQuoteCmdArg(e){if(!e){return'""'}if(!e.includes(" ")&&!e.includes("\t")&&!e.includes('"')){return e}if(!e.includes('"')&&!e.includes("\\")){return`"${e}"`}let t='"';let i=true;for(let n=e.length;n>0;n--){t+=e[n-1];if(i&&e[n-1]==="\\"){t+="\\"}else if(e[n-1]==='"'){i=true;t+="\\"}else{i=false}}t+='"';return t.split("").reverse().join("")}_cloneExecOptions(e){e=e||{};const t={cwd:e.cwd||process.cwd(),env:e.env||process.env,silent:e.silent||false,windowsVerbatimArguments:e.windowsVerbatimArguments||false,failOnStdErr:e.failOnStdErr||false,ignoreReturnCode:e.ignoreReturnCode||false,delay:e.delay||1e4};t.outStream=e.outStream||process.stdout;t.errStream=e.errStream||process.stderr;return t}_getSpawnOptions(e,t){e=e||{};const i={};i.cwd=e.cwd;i.env=e.env;i["windowsVerbatimArguments"]=e.windowsVerbatimArguments||this._isCmdFile();if(e.windowsVerbatimArguments){i.argv0=`"${t}"`}return i}exec(){return n(this,void 0,void 0,function*(){if(!l.isRooted(this.toolPath)&&(this.toolPath.includes("/")||f&&this.toolPath.includes("\\"))){this.toolPath=c.resolve(process.cwd(),this.options.cwd||process.cwd(),this.toolPath)}this.toolPath=yield a.which(this.toolPath,true);return new Promise((e,t)=>{this._debug(`exec tool: ${this.toolPath}`);this._debug("arguments:");for(const e of this.args){this._debug(`   ${e}`)}const i=this._cloneExecOptions(this.options);if(!i.silent&&i.outStream){i.outStream.write(this._getCommandString(i)+r.EOL)}const n=new ExecState(i,this.toolPath);n.on("debug",e=>{this._debug(e)});const s=this._getSpawnFileName();const o=u.spawn(s,this._getSpawnArgs(i),this._getSpawnOptions(this.options,s));const c="";if(o.stdout){o.stdout.on("data",e=>{if(this.options.listeners&&this.options.listeners.stdout){this.options.listeners.stdout(e)}if(!i.silent&&i.outStream){i.outStream.write(e)}this._processLineBuffer(e,c,e=>{if(this.options.listeners&&this.options.listeners.stdline){this.options.listeners.stdline(e)}})})}const a="";if(o.stderr){o.stderr.on("data",e=>{n.processStderr=true;if(this.options.listeners&&this.options.listeners.stderr){this.options.listeners.stderr(e)}if(!i.silent&&i.errStream&&i.outStream){const t=i.failOnStdErr?i.errStream:i.outStream;t.write(e)}this._processLineBuffer(e,a,e=>{if(this.options.listeners&&this.options.listeners.errline){this.options.listeners.errline(e)}})})}o.on("error",e=>{n.processError=e.message;n.processExited=true;n.processClosed=true;n.CheckComplete()});o.on("exit",e=>{n.processExitCode=e;n.processExited=true;this._debug(`Exit code ${e} received from tool '${this.toolPath}'`);n.CheckComplete()});o.on("close",e=>{n.processExitCode=e;n.processExited=true;n.processClosed=true;this._debug(`STDIO streams have closed for tool '${this.toolPath}'`);n.CheckComplete()});n.on("done",(i,n)=>{if(c.length>0){this.emit("stdline",c)}if(a.length>0){this.emit("errline",a)}o.removeAllListeners();if(i){t(i)}else{e(n)}});if(this.options.input){if(!o.stdin){throw new Error("child process missing stdin")}o.stdin.end(this.options.input)}})})}}t.ToolRunner=ToolRunner;function argStringToArray(e){const t=[];let i=false;let n=false;let s="";function append(e){if(n&&e!=='"'){s+="\\"}s+=e;n=false}for(let r=0;r<e.length;r++){const o=e.charAt(r);if(o==='"'){if(!n){i=!i}else{append(o)}continue}if(o==="\\"&&n){append(o);continue}if(o==="\\"&&i){n=true;continue}if(o===" "&&!i){if(s.length>0){t.push(s);s=""}continue}append(o)}if(s.length>0){t.push(s.trim())}return t}t.argStringToArray=argStringToArray;class ExecState extends o.EventEmitter{constructor(e,t){super();this.processClosed=false;this.processError="";this.processExitCode=0;this.processExited=false;this.processStderr=false;this.delay=1e4;this.done=false;this.timeout=null;if(!t){throw new Error("toolPath must not be empty")}this.options=e;this.toolPath=t;if(e.delay){this.delay=e.delay}}CheckComplete(){if(this.done){return}if(this.processClosed){this._setResult()}else if(this.processExited){this.timeout=setTimeout(ExecState.HandleTimeout,this.delay,this)}}_debug(e){this.emit("debug",e)}_setResult(){let e;if(this.processExited){if(this.processError){e=new Error(`There was an error when attempting to execute the process '${this.toolPath}'. This may indicate the process failed to start. Error: ${this.processError}`)}else if(this.processExitCode!==0&&!this.options.ignoreReturnCode){e=new Error(`The process '${this.toolPath}' failed with exit code ${this.processExitCode}`)}else if(this.processStderr&&this.options.failOnStdErr){e=new Error(`The process '${this.toolPath}' failed because one or more lines were written to the STDERR stream`)}}if(this.timeout){clearTimeout(this.timeout);this.timeout=null}this.done=true;this.emit("done",e,this.processExitCode)}static HandleTimeout(e){if(e.done){return}if(!e.processClosed&&e.processExited){const t=`The STDIO streams did not close within ${e.delay/1e3} seconds of the exit event from process '${e.toolPath}'. This may indicate a child process inherited the STDIO streams and has not yet exited.`;e._debug(t)}e._setResult()}}},962:function(e,t,i){var n=this&&this.__awaiter||function(e,t,i,n){function adopt(e){return e instanceof i?e:new i(function(t){t(e)})}return new(i||(i=Promise))(function(i,s){function fulfilled(e){try{step(n.next(e))}catch(e){s(e)}}function rejected(e){try{step(n["throw"](e))}catch(e){s(e)}}function step(e){e.done?i(e.value):adopt(e.value).then(fulfilled,rejected)}step((n=n.apply(e,t||[])).next())})};var s;Object.defineProperty(t,"__esModule",{value:true});const r=i(357);const o=i(747);const u=i(622);s=o.promises,t.chmod=s.chmod,t.copyFile=s.copyFile,t.lstat=s.lstat,t.mkdir=s.mkdir,t.readdir=s.readdir,t.readlink=s.readlink,t.rename=s.rename,t.rmdir=s.rmdir,t.stat=s.stat,t.symlink=s.symlink,t.unlink=s.unlink;t.IS_WINDOWS=process.platform==="win32";function exists(e){return n(this,void 0,void 0,function*(){try{yield t.stat(e)}catch(e){if(e.code==="ENOENT"){return false}throw e}return true})}t.exists=exists;function isDirectory(e,i=false){return n(this,void 0,void 0,function*(){const n=i?yield t.stat(e):yield t.lstat(e);return n.isDirectory()})}t.isDirectory=isDirectory;function isRooted(e){e=normalizeSeparators(e);if(!e){throw new Error('isRooted() parameter "p" cannot be empty')}if(t.IS_WINDOWS){return e.startsWith("\\")||/^[A-Z]:/i.test(e)}return e.startsWith("/")}t.isRooted=isRooted;function mkdirP(e,i=1e3,s=1){return n(this,void 0,void 0,function*(){r.ok(e,"a path argument must be provided");e=u.resolve(e);if(s>=i)return t.mkdir(e);try{yield t.mkdir(e);return}catch(n){switch(n.code){case"ENOENT":{yield mkdirP(u.dirname(e),i,s+1);yield t.mkdir(e);return}default:{let i;try{i=yield t.stat(e)}catch(e){throw n}if(!i.isDirectory())throw n}}}})}t.mkdirP=mkdirP;function tryGetExecutablePath(e,i){return n(this,void 0,void 0,function*(){let n=undefined;try{n=yield t.stat(e)}catch(t){if(t.code!=="ENOENT"){console.log(`Unexpected error attempting to determine if executable file exists '${e}': ${t}`)}}if(n&&n.isFile()){if(t.IS_WINDOWS){const t=u.extname(e).toUpperCase();if(i.some(e=>e.toUpperCase()===t)){return e}}else{if(isUnixExecutable(n)){return e}}}const s=e;for(const r of i){e=s+r;n=undefined;try{n=yield t.stat(e)}catch(t){if(t.code!=="ENOENT"){console.log(`Unexpected error attempting to determine if executable file exists '${e}': ${t}`)}}if(n&&n.isFile()){if(t.IS_WINDOWS){try{const i=u.dirname(e);const n=u.basename(e).toUpperCase();for(const s of yield t.readdir(i)){if(n===s.toUpperCase()){e=u.join(i,s);break}}}catch(t){console.log(`Unexpected error attempting to determine the actual case of the file '${e}': ${t}`)}return e}else{if(isUnixExecutable(n)){return e}}}}return""})}t.tryGetExecutablePath=tryGetExecutablePath;function normalizeSeparators(e){e=e||"";if(t.IS_WINDOWS){e=e.replace(/\//g,"\\");return e.replace(/\\\\+/g,"\\")}return e.replace(/\/\/+/g,"/")}function isUnixExecutable(e){return(e.mode&1)>0||(e.mode&8)>0&&e.gid===process.getgid()||(e.mode&64)>0&&e.uid===process.getuid()}},436:function(e,t,i){var n=this&&this.__awaiter||function(e,t,i,n){function adopt(e){return e instanceof i?e:new i(function(t){t(e)})}return new(i||(i=Promise))(function(i,s){function fulfilled(e){try{step(n.next(e))}catch(e){s(e)}}function rejected(e){try{step(n["throw"](e))}catch(e){s(e)}}function step(e){e.done?i(e.value):adopt(e.value).then(fulfilled,rejected)}step((n=n.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:true});const s=i(129);const r=i(622);const o=i(669);const u=i(962);const c=o.promisify(s.exec);function cp(e,t,i={}){return n(this,void 0,void 0,function*(){const{force:n,recursive:s}=readCopyOptions(i);const o=(yield u.exists(t))?yield u.stat(t):null;if(o&&o.isFile()&&!n){return}const c=o&&o.isDirectory()?r.join(t,r.basename(e)):t;if(!(yield u.exists(e))){throw new Error(`no such file or directory: ${e}`)}const a=yield u.stat(e);if(a.isDirectory()){if(!s){throw new Error(`Failed to copy. ${e} is a directory, but tried to copy without recursive flag.`)}else{yield cpDirRecursive(e,c,0,n)}}else{if(r.relative(e,c)===""){throw new Error(`'${c}' and '${e}' are the same file`)}yield copyFile(e,c,n)}})}t.cp=cp;function mv(e,t,i={}){return n(this,void 0,void 0,function*(){if(yield u.exists(t)){let n=true;if(yield u.isDirectory(t)){t=r.join(t,r.basename(e));n=yield u.exists(t)}if(n){if(i.force==null||i.force){yield rmRF(t)}else{throw new Error("Destination already exists")}}}yield mkdirP(r.dirname(t));yield u.rename(e,t)})}t.mv=mv;function rmRF(e){return n(this,void 0,void 0,function*(){if(u.IS_WINDOWS){try{if(yield u.isDirectory(e,true)){yield c(`rd /s /q "${e}"`)}else{yield c(`del /f /a "${e}"`)}}catch(e){if(e.code!=="ENOENT")throw e}try{yield u.unlink(e)}catch(e){if(e.code!=="ENOENT")throw e}}else{let t=false;try{t=yield u.isDirectory(e)}catch(e){if(e.code!=="ENOENT")throw e;return}if(t){yield c(`rm -rf "${e}"`)}else{yield u.unlink(e)}}})}t.rmRF=rmRF;function mkdirP(e){return n(this,void 0,void 0,function*(){yield u.mkdirP(e)})}t.mkdirP=mkdirP;function which(e,t){return n(this,void 0,void 0,function*(){if(!e){throw new Error("parameter 'tool' is required")}if(t){const t=yield which(e,false);if(!t){if(u.IS_WINDOWS){throw new Error(`Unable to locate executable file: ${e}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also verify the file has a valid extension for an executable file.`)}else{throw new Error(`Unable to locate executable file: ${e}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also check the file mode to verify the file is executable.`)}}}try{const t=[];if(u.IS_WINDOWS&&process.env.PATHEXT){for(const e of process.env.PATHEXT.split(r.delimiter)){if(e){t.push(e)}}}if(u.isRooted(e)){const i=yield u.tryGetExecutablePath(e,t);if(i){return i}return""}if(e.includes("/")||u.IS_WINDOWS&&e.includes("\\")){return""}const i=[];if(process.env.PATH){for(const e of process.env.PATH.split(r.delimiter)){if(e){i.push(e)}}}for(const n of i){const i=yield u.tryGetExecutablePath(n+r.sep+e,t);if(i){return i}}return""}catch(e){throw new Error(`which failed with message ${e.message}`)}})}t.which=which;function readCopyOptions(e){const t=e.force==null?true:e.force;const i=Boolean(e.recursive);return{force:t,recursive:i}}function cpDirRecursive(e,t,i,s){return n(this,void 0,void 0,function*(){if(i>=255)return;i++;yield mkdirP(t);const n=yield u.readdir(e);for(const r of n){const n=`${e}/${r}`;const o=`${t}/${r}`;const c=yield u.lstat(n);if(c.isDirectory()){yield cpDirRecursive(n,o,i,s)}else{yield copyFile(n,o,s)}}yield u.chmod(t,(yield u.stat(e)).mode)})}function copyFile(e,t,i){return n(this,void 0,void 0,function*(){if((yield u.lstat(e)).isSymbolicLink()){try{yield u.lstat(t);yield u.unlink(t)}catch(e){if(e.code==="EPERM"){yield u.chmod(t,"0666");yield u.unlink(t)}}const i=yield u.readlink(e);yield u.symlink(i,t,u.IS_WINDOWS?"junction":null)}else if(!(yield u.exists(t))||i){yield u.copyFile(e,t)}})}},69:(e,t)=>{Object.defineProperty(t,"__esModule",{value:true});t.Outputs=t.Inputs=void 0;var i;(function(e){e["AUTH_FILE_PATH"]="auth_file_path";e["DISABLE_DOCKER_INTEGRATION"]="disable_docker_integration";e["LOGOUT"]="logout";e["PASSWORD"]="password";e["REGISTRY"]="registry";e["USERNAME"]="username"})(i=t.Inputs||(t.Inputs={}));var n;(function(e){})(n=t.Outputs||(t.Outputs={}))},144:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:true});const n=i(186);const s=i(747);const r=i(436);const o=i(87);const u=i(622);const c=i(314);const a=i(963);const l=i(69);let f;let d;const p=u.join(o.homedir(),".docker","config.json");async function getPodmanPath(){if(f==null){f=await r.which("podman",true);await c.execute(f,["version"],{group:true})}return f}async function run(){if(o.platform()!=="linux"){throw new Error("❌ Only supported on linux platform")}d=n.getInput(l.Inputs.REGISTRY,{required:true});const e=n.getInput(l.Inputs.USERNAME,{required:true});const t=n.getInput(l.Inputs.PASSWORD,{required:true});const i=n.getInput(l.Inputs.LOGOUT)||"true";const r=n.getInput(l.Inputs.AUTH_FILE_PATH);const f=n.getInput(l.Inputs.DISABLE_DOCKER_INTEGRATION)||"false";a.setRegistry(d);a.setLogout(i);a.setDisableDockerIntegration(f);const h=["login",d,"-u",e,"-p",t];h.push("--verbose");if(r){h.push(`--authfile=${r}`)}await c.execute(await getPodmanPath(),h);n.info(`✅ Successfully logged in to ${d} as ${e}`);let g;if(r){g=r}else{let e=u.join("/","tmp",`podman-run-${process.getuid()}`);if(process.env.XDG_RUNTIME_DIR){e=process.env.XDG_RUNTIME_DIR}g=u.join(e,"containers","auth.json")}const m="REGISTRY_AUTH_FILE";n.info(`Exporting ${m}=${g}`);n.exportVariable(m,g);const y=await s.promises.readFile(g,"utf-8");const w=JSON.parse(y);const _=w.auths[d];if(!f){n.info(`✍️ Writing registry credentials to "${p}"`);const e=JSON.parse(await c.getDockerConfigJson());e.auths[d]=_;await s.promises.writeFile(p,JSON.stringify(e,undefined,8),"utf-8")}}async function registryLogout(){if(!a.logout){return}await c.execute(await getPodmanPath(),["logout",a.registry]);if(!a.disableDockerIntegration){const e=JSON.parse(await c.getDockerConfigJson());n.info(`Removing registry credentials from "${p}"`);delete e.auths[d];await s.promises.writeFile(p,JSON.stringify(e,undefined,8),"utf-8")}}if(!a.IsPost){run().catch(n.setFailed)}else{registryLogout().catch(n.setFailed)}},963:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:true});t.setDisableDockerIntegration=t.setLogout=t.setRegistry=t.logout=t.disableDockerIntegration=t.registry=t.IsPost=void 0;const n=i(186);t.IsPost=!!process.env.STATE_isPost;t.registry=process.env.STATE_registry||"";t.disableDockerIntegration=process.env.STATE_disableDockerIntegration||false;t.logout=/true/i.test(process.env.STATE_logout||"");function setRegistry(e){n.saveState("registry",e)}t.setRegistry=setRegistry;function setLogout(e){n.saveState("logout",e)}t.setLogout=setLogout;function setDisableDockerIntegration(e){n.saveState("disableDockerIntegration",e)}t.setDisableDockerIntegration=setDisableDockerIntegration;if(!t.IsPost){n.saveState("isPost","true")}},314:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:true});t.getDockerConfigJson=t.execute=void 0;const n=i(186);const s=i(514);const r=i(622);const o=i(747);const u=i(87);async function execute(e,t,i={}){let o="";let u="";const c={...i};c.ignoreReturnCode=true;c.listeners={stdline:e=>{o+=`${e}\n`},errline:e=>{u+=`${e}\n`}};if(i.group){const i=[e,...t].join(" ");n.startGroup(i)}try{const a=await s.exec(e,t,c);if(i.ignoreReturnCode!==true&&a!==0){let t=`${r.basename(e)} exited with code ${a}`;if(u){t+=`\n${u}`}throw new Error(t)}return{exitCode:a,stdout:o,stderr:u}}finally{if(i.group){n.endGroup()}}}t.execute=execute;async function getDockerConfigJson(){const e=r.join(u.homedir(),".docker","config.json");return o.promises.readFile(e,"utf-8")}t.getDockerConfigJson=getDockerConfigJson},357:e=>{e.exports=require("assert")},129:e=>{e.exports=require("child_process")},614:e=>{e.exports=require("events")},747:e=>{e.exports=require("fs")},87:e=>{e.exports=require("os")},622:e=>{e.exports=require("path")},669:e=>{e.exports=require("util")}};var t={};function __webpack_require__(i){if(t[i]){return t[i].exports}var n=t[i]={exports:{}};var s=true;try{e[i].call(n.exports,n,n.exports,__webpack_require__);s=false}finally{if(s)delete t[i]}return n.exports}__webpack_require__.ab=__dirname+"/";return __webpack_require__(144)})();
//# sourceMappingURL=index.js.map