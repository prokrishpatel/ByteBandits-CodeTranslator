const apiKey="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";
const url="https://api.openai.com/v1/chat/completions" ;

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
const input = document.getElementById("codeInput");
const inLangSelect = document.getElementById("languageSelect");
const outLangSelect = document.getElementById("languageOut");
const result = document.getElementById("output");

const translateLanguage = document.getElementById("translateLanguage");
const findBugs = document.getElementById("findBugs");
const resolveBugs = document.getElementById("resolveBugs");
const generateTestcases = document.getElementById("generateTestcases");
const improveCode = document.getElementById("improveCode");

//function to translate
async function getResult(code="",toDo="",changeTo="",changeFrom=""){

    if(!code) return "NULL";

    let message=[];

    switch (toDo) {
        case "translateLanguage":
            // Adding Prompts to Translate Language 
            message.push({"role":"system", "content":`You are an excellent computer programming language code translator who can understand and translate syntax properly between varities of programing languages and leaves no error in resulted translated code by resolving errors in given code if any`});
            message.push({"role":"user", "content":`Translate the given ${changeFrom} code  to ${changeTo} programming language with no bugs and tesed on rigorous test cases (Note: return only transtated code as an output not any other explanation or text) . Code: ${code}`});
            break;

        case "findBugs":
            // Adding Prompts to Find Bugs 
            message.push({"role":"system", "content":`You are excellent at understanding the given code and identifying and highlighting bugs in given code written in any prpgraming language if any`});
            message.push({"role":"user", "content":`Identify the bugs in given ${changeFrom} code and highlight them if any. Code: ${code}`});
            break;

        case "resolveBugs":
            message.push({"role":"system", "content":`You are excellent at understanding the given code and resloving bugs in given code written in any programming language if any and returns the bug free code.`});
            message.push({"role":"user", "content":`Remove the bugs in given ${changeFrom} code if any (Note: return only bug free code as an output not any other explanation or text). Code: ${code}`});
            break;

        case "generateTestCase":
            // Adding Prompts to Generate TestCase
            message.push({"role":"system", "content":`You are excellent at understanding the given code written in any prpgraming language and generate rigorous testcases that the code need to pass in order to solve the problem that code trying to solve. generated cases may include TLE(time limit excced) cases , memory limit excced , the worse caes , the logical tast case that is not handeled in a code but may occur in solving problem that is tackeled by code , and many more`});
            message.push({"role":"user", "content":`Generate rigorous testcases for given ${changeFrom} code (Note: return only generated testcaes not much of any explanation or any other text). Code: ${code}`});
            break;

        case "improveCode":
            // Adding Prompts to Improve Code
            message.push({"role":"system", "content":`You are excellent at understanding the given code written in any prpgraming language and improves and optimizes the given code by making necessory changes in code so that the improved/optimizes code can pass any rigorous tetstcases. Improved/Optimized code should pass testcases such as TLE(time limit excced) cases , memory limit excced , the worse caes or the logical tast case that is not handeled in a code but may occur in solving problem that is tackeled by code , and many more`});
            message.push({"role":"user", "content":`Improve/Optimize the given ${changeFrom} code (Note: return only improved code as an output not any other explanation or text) . Code: ${code}`});
            break;

        default:
            return "NULL";
            break;
    }

    let prompt = {
        "model": "gpt-3.5-turbo",
        "messages": message,
        "temperature": 1.0,
        "top_p": 1.0,
        "n": 1,
        "stream": false,
        "presence_penalty": 0,
        "frequency_penalty": 0
    };

    // Fetching results from OpenAI API Endpoint using url
    let res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(prompt)
    });
    console.log('Made request to openai')

    // Throw error on failed fetching
    if (!res.ok) {
        throw new Error(`Error occured at response not ok: ${res.statusText}`);
    }

    // Conveting response to json object
    res = await res.json();

    // Returning responce for given query
    return res['choices'][0]['message']['content'];
}

translateLanguage.addEventListener('click',async ()=>{
    const code = input.value;
    //selceted indexs
    const ci1 = inLangSelect.selectedIndex;
    const co1 = outLangSelect.selectedIndex;

    // Get the selected option element
    const ci2 = inLangSelect.options[ci1];
    const co2 = inLangSelect.options[co1];

    // Get the value of the selected option
    let changeFrom = ci2.value;
    let changeTo = co2.value;
    let toDo="translateLanguage";

    result.innerHTML = "Translating Language....";
    const ans = await getResult(code,toDo,changeTo,changeFrom);
    result.innerHTML = ans;
});

findBugs.addEventListener('click',async ()=>{
    const code = input.value;
    //selceted indexs
    const ci1 = inLangSelect.selectedIndex;
    const co1 = outLangSelect.selectedIndex;

    // Get the selected option element
    const ci2 = inLangSelect.options[ci1];
    const co2 = inLangSelect.options[co1];

    // Get the value of the selected option
    let changeFrom = ci2.value;
    let changeTo = co2.value;
    let toDo="findBugs";

    result.innerHTML = "Finding bugs....";
    const ans = await getResult(code,toDo,changeTo,changeFrom);
    result.innerHTML = ans;
});

resolveBugs.addEventListener('click',async ()=>{
    const code = input.value;
    //selceted indexs
    const ci1 = inLangSelect.selectedIndex;
    const co1 = outLangSelect.selectedIndex;

    // Get the selected option element
    const ci2 = inLangSelect.options[ci1];
    const co2 = inLangSelect.options[co1];

    // Get the value of the selected option
    let changeFrom = ci2.value;
    let changeTo = co2.value;
    let toDo="resolveBugs";

    result.innerHTML = "Resolving bugs....";
    const ans = await getResult(code,toDo,changeTo,changeFrom);
    result.innerHTML = ans;
});

generateTestcases.addEventListener('click',async ()=>{
    const code = input.value;
    //selceted indexs
    const ci1 = inLangSelect.selectedIndex;
    const co1 = outLangSelect.selectedIndex;

    // Get the selected option element
    const ci2 = inLangSelect.options[ci1];
    const co2 = inLangSelect.options[co1];

    // Get the value of the selected option
    let changeFrom = ci2.value;
    let changeTo = co2.value;
    let toDo="generateTestCase";

    result.innerHTML = "Generating Test Cases....";
    const ans = await getResult(code,toDo,changeTo,changeFrom);
    result.innerHTML = ans;
});

improveCode.addEventListener('click',async ()=>{
    const code = input.value;
    //selceted indexs
    const ci1 = inLangSelect.selectedIndex;
    const co1 = outLangSelect.selectedIndex;

    // Get the selected option element
    const ci2 = inLangSelect.options[ci1];
    const co2 = inLangSelect.options[co1];

    // Get the value of the selected option
    let changeFrom = ci2.value;
    let changeTo = co2.value;
    let toDo="improveCode";

    result.innerHTML = "Improving Code....";
    const ans = await getResult(code,toDo,changeTo,changeFrom);
    result.innerHTML = ans;
});