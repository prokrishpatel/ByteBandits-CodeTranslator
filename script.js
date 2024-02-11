//copy code
const copyButton = document.getElementById("copyButton");
copyButton.addEventListener("click", () => {
    const outputText = document.getElementById("output").innerText;
    const textarea = document.createElement("textarea");
    textarea.value = outputText;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    alert("Text copied to clipboard!");
});

//action
const translate = document.getElementById("translate");
const input = document.getElementById("codeInput");
const inLangSelect = document.getElementById("languageSelect");
const outLangSelect = document.getElementById("languageOut");
const result = document.getElementById("output");

//function to translate
function trans(input,inL,outL){
    let ans = "Your Desired Output";
    //Translate input (inL->outL)



    return ans;
}




translate.addEventListener('click',()=>{
    const inp = input.value;
    //selceted indexs
    const ci1 = inLangSelect.selectedIndex;
    const co1 = outLangSelect.selectedIndex;

    // Get the selected option element
    const ci2 = inLangSelect.options[ci1];
    const co2 = inLangSelect.options[co1];

    // Get the value of the selected option
    let invalue = ci2.value;
    let outvalue = co2.value;
    const ans = trans(inp,invalue,outvalue);
    result.innerText = ans;
})


