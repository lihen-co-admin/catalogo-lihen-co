export function initRulesDialog(){
 const dialog=document.querySelector("#rules-dialog");
 document.querySelector("#open-rules")?.addEventListener("click",()=>dialog?.showModal());
 document.querySelector("#close-rules")?.addEventListener("click",()=>dialog?.close());
 document.querySelector("#accept-rules-dialog")?.addEventListener("click",()=>dialog?.close());
 dialog?.addEventListener("click",e=>{if(e.target===dialog) dialog.close();});
}
