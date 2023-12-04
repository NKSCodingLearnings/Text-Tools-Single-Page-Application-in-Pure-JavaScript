(()=>{
const main = document.querySelector('main');
const linkClickHandler = (event)=>{
    event.preventDefault();
    let path = event.target.getAttribute('href') || "/"; if(!path.startsWith("/")) path = "/"+path;
    history.pushState({},null,path);
    route();
};
document.querySelector("nav a").addEventListener("click",linkClickHandler);
window.addEventListener('popstate',()=>{
    route();
});
var home;
const Home = ()=>{
    if (!home) {
        let homeUi = "<header>\
            <figure>\
                <picture>\
                    <img src='https://images.unsplash.com/photo-1626968361222-291e74711449?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1MDk0Nzl8MHwxfHNlYXJjaHw3fHxjb2RlcnxlbnwwfHx8fDE3MDEzNDAzNDF8MA&ixlib=rb-4.0.3&q=85&w=1200' alt=''>\
                </picture>\
                <figcaption>Photo by <a href='https://unsplash.com/@thaliatran' rel='noopener ugc nofollow' target='_blank' style='color: inherit;'>Thalia Tran</a> on <a href='https://unsplash.com/?utm_source=medium&amp;utm_medium=referral' rel='noopener ugc nofollow' target='_blank' style='color: inherit;'>Unsplash</a></figcaption>\
            </figure>\
            <h1>Welcome to Text Tools, a Single Page Application (SPA) in Pure JavaScript</h1>\
            <p>This website serves as a showcase illustrating the construction of a single-page application using pure JavaScript. To delve into the theory and inner workings of Single Page Applications built with JavaScript, explore the following blog posts by clicking on the links below:</p>\
            <div>\
                <a class='linkBtn' target='_blank' href='https://code.nkslearning.com/blogs/understanding-single-page-applications-in-pure-javascript_656773a066999959c89a'>SPA: Theory</a>\
                <a class='linkBtn' target='_blank' href='https://code.nkslearning.com/'>SPA: Code</a>\
            </div>\
        </header>\
        <p>This website features a straightforward text utilities application. Here, you can determine the number of words, characters, spaces, and occurrences of specific words or groups of words within your text. Visit the Tools Page to get started by clicking link below:</p>\
        <a class='linkBtn' style='display: block;margin: 10px auto; width: fit-content;' href='/tools'>Explore Text Tools</a>";
        home = document.createElement("div");
        home.classList.add("home");
        home.innerHTML = homeUi;
        home.lastElementChild.addEventListener("click",linkClickHandler);
    }
    main.replaceChildren(home);
};
var tools;
const Tools = ()=>{
    if (!tools) {
        let t = "<div class='tool'>\
            <div><img src='/words-counter-feature.png' alt=''></div>\
            <span class='tool-title'>Words Counter</span>\
            <span class='tool-desc'>This is a simple tool to calculate the number of words in your provided text.</span>\
            <a href='/tools/words-counter' style='position: absolute;inset: 0;'></a>\
        </div>";
        tools = document.createElement('div'); tools.classList.add("toolsBox");
        tools.innerHTML = t;
        const links = tools.querySelectorAll('a');
        links.forEach((e)=>{
            e.addEventListener('click',linkClickHandler);
        });
    }
    main.replaceChildren(tools);
};
var wordCounter, inputBox,queryBox,runBtn,outputBox, runAction = "1",actionMess;
const WordCounter = ()=>{
    if (!wordCounter) {
        let r = "<header>\
            <h1>Words Counter</h1>\
            <p>Determine the number of words, characters, spaces, specific words, or groups of words in your text.</p>\
        </header>\
        <div style='background: rgb(240, 240, 240);padding: 10px; border-radius: 10px;margin:10px;'>\
            <div class='inputBox' style='display: flex;justify-content: space-between; align-items: center;flex-wrap: wrap;'>\
                <span>Input Your Texts</span>\
                <select style='font-size: 16px;padding: 5px;'>\
                    <option value='1'>Count Real Words</option>\
                    <option value='2'>Count Average Words</option>\
                    <option value='3'>Count Specific Words</option>\
                </select>\
            </div>\
            <div class='actionMess' style='font-family: math;font-size: 17px;color: #5f5f5f;padding: 0 5px 10px 5px;'></div>\
            <input disabled='ture' autocomplete='off' style='min-height: fit-content;height: fit-content;border-radius: 5px;margin-bottom:10px;'></input>\
            <textarea placeholder='Enter text here'></textarea>\
        </div>\
        <div style='display: flex;align-items: center; justify-content: center;'>\
            <button class='runBtn'>Get Result</button>\
        </div>\
        <div style='background: rgb(240, 240, 240);padding: 10px; border-radius: 10px;margin:10px;'>\
            <div class='inputBox'>\
                <span>Results</span>\
            </div>\
            <div class='results'>\
            </div>\
        </div>";
        wordCounter = document.createElement("div");
        wordCounter.classList.add("wordsCounter");
        wordCounter.innerHTML = r;
        queryBox = wordCounter.querySelector('input');
        inputBox = wordCounter.querySelector('textarea');
        runBtn = wordCounter.querySelector('.runBtn');
        actionMess = wordCounter.querySelector('.actionMess');
        outputBox = wordCounter.querySelector('.results');
        actionMess.textContent = 'Count real words, treating expressions like "Hello, world!" as separate words: "Hello" and "world."';
        wordCounter.querySelector("select").addEventListener("change",(event)=>{
            runAction = event.target.value;
            console.log(runAction);
            let mess;
            if (runAction === "1") {
                mess = 'Count real words, treating expressions like "Hello, world!" as separate words: "Hello" and "world."';
                queryBox.disabled = true;
                queryBox.value = "";
                queryBox.placeholder = "";
            }
            else if(runAction === "2"){
                mess = 'Calculate average words by dividing the total number of characters by 5 or a specified number.';
                queryBox.disabled = false;
                queryBox.placeholder = "Enter specified number here";
                queryBox.type = "number";
                queryBox.value = "5";
            } 
            else if(runAction === "3"){
                mess = 'Search for a word or group of words within the given text.';
                queryBox.placeholder = "Enter query words here";
                queryBox.disabled = false;
                queryBox.value = "";
                queryBox.type = "text";
            } 
            actionMess.textContent = mess;
        });
        runBtn.addEventListener("click",()=>{
            let input = inputBox.value;
            if (input === "") {
                showToast("Input text is now empty.");
            }else{
                if (runAction === "1") {
                    var t = countStatsAndListPunctuations(input);
                    var w = "";
                    t.e.forEach((item)=>{
                        w = w +item + ' ';
                    });
                    if(w.length >0) w = w.substring(0,w.length - 1);
                    var v = "<div>Total Words = "+t.a+"</div>\
                             <div>Total Characters = "+t.b+"</div>\
                             <div>Total Spaces = "+t.c+"</div>\
                             <div>Total Punctuations = "+t.d+"</div>\
                             <div>Punctuations are: "+w+"</div>"
                    outputBox.innerHTML = v;
                    scrollIntoViewIfNeeded(outputBox);
                }else if (runAction === "2") {
                    let d = queryBox.value;
                    if (d === "" || d === "0") {
                        showToast({message:d===""?"Please enter how many characters in a word.":"Characters count in a word must be greater than 1.",time:1500});
                    }else{
                        let divider = Number.parseInt(d);
                        if (isNaN(divider)) {
                            showToast({type:"error",message:"An error occurred."});
                        } else {
                            let characters = input.length;
                            let words1 = characters / divider;
                            let spaces = input.split(' ').length - 1;
                            let words2 = (characters - spaces) / divider;
                            var v = "<div>Total Words With Spaces = "+words1+"</div>\
                                     <div>Total Words Without Spaces = "+words2+"</div>\
                                     <div>Total Characters = "+characters+"</div>\
                                     <div>Total Spaces = "+spaces+"</div>"
                            outputBox.innerHTML = v;
                            scrollIntoViewIfNeeded(outputBox);
                        }
                    }
                }else if (runAction === "3") {
                    let q = queryBox.value;
                    if (q === "") {
                        showToast("Enter query text");
                    }else{
                        var t = countOccurrences(input,q);
                        var v = "<div>Total Occurrences (With Case Sensitive ) = "+t.w+"</div>\
                                 <div>Total Occurrences (Without Case Sensitive ) = "+t.v+"</div>";
                        outputBox.innerHTML = v;
                        scrollIntoViewIfNeeded(outputBox);
                    }
                }
            }
        });
    }
    main.replaceChildren(wordCounter);
};

function scrollIntoViewIfNeeded(element) {
    const elementRect = element.getBoundingClientRect();
    if (elementRect.bottom > window.innerHeight) {
      const scrollAmount = elementRect.bottom + 20 - window.innerHeight;
      window.scrollTo({
        top: window.scrollY + scrollAmount,
        behavior: 'smooth'
      });
    }
}
function countOccurrences(text, searchText) {
    
    const regex = new RegExp(searchText, 'g');
    const matches1 = text.match(regex);
    let w = matches1 ? matches1.length : 0;
    
    text = text.toLowerCase();
    searchText = searchText.toLowerCase();
    const matches = text.match(regex);
    let v = matches ? matches.length : 0;
    return{w:w,v:v};
}
function countStatsAndListPunctuations(text) {
    const words = text.split(/\s+|\b(?=[^\w\s])/).filter(word => word.length > 0);
    const filteredWords = words.filter(word => !/^[^\w]+$/.test(word));

    const characters = text.length;
    const spaces = text.split(' ').length - 1;
    var punctuations = text.match(/[^\w\s]/g) || [];
    let pl = punctuations.length;
    punctuations = Array.from(new Set(punctuations));
  
    return {
      a: filteredWords.length,
      b:characters,
      c:spaces,
      d: pl,
      e: punctuations
    };
}
var nFound;
function notFound() {
    if(!nFound) {
        nFound = document.createElement("div");
        nFound.style = "display: flex;align-items: center;flex-direction: column;padding: 20px;text-align: center;";
        nFound.innerHTML = "<h1>Page Not Found</h1><div style='font-size: 22px;font-family: math;'>Sorry, the page you are looking for is not found.";
    }
    main.replaceChildren(nFound);
}
const route = ()=>{
    let path = location.pathname;
    let pathName = path.replace(/\/+$/, path === '/' ? '/' : '');
    switch (pathName) {
        case '/': case '/index.html': Home(); break;
        case '/tools': Tools(); break;
        case '/tools/words-counter': WordCounter(); break;
        default: notFound(); break;
    }
};
route();

const types = { info: "dodgerblue", warn: "darkorange", error: "red",success:"forestgreen" };
const showToast = (o)=> {
  if (!o) o = {message:"Empty message"}
  const { message, time, from, type } = o;

  const m = document.createElement("div"); m.classList.add("toast");
  const keyframes = [];
  let s = "";
  switch (from) {
    case "tl": case "tr":
      keyframes.push({ transform: "translateY(-100%)", top: 0 });
      s = from === "tl" ? "let:0;top:0;" : "right:0;top:0;"; break;
    case "bc":
      keyframes.push({ transform: "translateY(100%)", bottom: 0 });
      s = "right:10px;bottom:0;left:10px;width:fit-content;margin:30px auto;"; break;
    case "bl": case "br": default:
      keyframes.push({ transform: "translateY(100%)", bottom: 0 });
      s = from === "br" ? "right:0;bottom:0;" : "left:0;bottom:0;"; break;
  }
  s = s +"background:" + types[type || "info"] + ";box-shadow: 0 0 10px 2px " + types[type || "info"] + ";";
  keyframes.push({ transform: "translateY(0px)" });
  m.style = s;
  m.textContent = message || o;
  document.body.appendChild(m);
  m.animate(keyframes, { duration: 300 })
  .onfinish = () => {
    m.animate(keyframes, {delay: time || 1000,duration: 300,direction: "reverse"})
    .onfinish = () => {
      m.remove();
    };
  };
};
})();