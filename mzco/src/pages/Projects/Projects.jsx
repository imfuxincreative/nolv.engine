import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import img3 from "../../assets/images/InfiniteImages/beach1.jpg";
import { sendMessageToBot } from "../../api/chat.js";
import { IoIosSend } from "react-icons/io";
gsap.registerPlugin(ScrollTrigger);

function Projects() {
  const msgRefs = useRef({});
  const scrollTl = useRef(null);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

const [timeline, setTimeline] = useState([
  // INTRO
  { id: "l1", sender: "bot", animated: true, static: true, content: <p>Hii</p> },
  // { id: "l2", sender: "bot", animated: true, content: <p>Yeah</p> },
  { id: "l3", sender: "bot", animated: true, content: <p>you’re here</p> },
  { id: "l4", sender: "bot", animated: true, content: <p>Take your time</p> },

  { id: "l5", sender: "bot", animated: true, content: <p>This is a project I’ve been building quietly</p> },
  {
    id: "l6",
    sender: "bot",
    animated: true,
    content: <p>For creatives who care about their crafts more than the noise around it</p>,
  },

  {
    id: "sl7",
    sender: "bot",
    animated: true,
    content: (
      <p>
        Designers
      </p>
    ),
  },

  {
    id: "dl7",
    sender: "bot",
    animated: true,
    content: (
      <p>
       
        Photographers<br />
  
      </p>
    ),
  },
  {
    id: "el7",
    sender: "bot",
    animated: true,
    content: (
      <p>
      
        Visual creators
      </p>
    ),
  },
  {
    id: "fl8",
    sender: "bot",
    animated: true,
    content: (
      <p>
        People who want their crafts<br />
        to be seen properly
      </p>
    ),
  },

  { id: "l9", sender: "bot", animated: true, content: <p>Here, posts aren’t rushed past</p> },
  { id: "l10", sender: "bot", animated: true, content: <p>They’re evaluated</p> },

  {
    id: "l11",
    sender: "bot",
    animated: true,
    content: (
      <p>
        Creativity<br />
      
      </p>
    ),
  },
  {
    id: "m11",
    sender: "bot",
    animated: true,
    content: (
      <p>
  
        Aesthetics
      </p>
    ),
  },
    {
    id: "n11",
    sender: "bot",
    animated: true,
    content: (
      <p>
   
        Emotion
      </p>
    ),
  },
  { id: "l12", sender: "bot", animated: true, content: <p>Some visuals / designs / Fahion stands out</p> },
  { id: "l13", sender: "bot", animated: true, content: <p>It gets recognized</p> },

  {
    id: "l14",
    sender: "bot",
    animated: true,
    content: (
      <p>
        Day
      
    
      </p>
    ),
  },
  {
    id: "t14",
    sender: "bot",
    animated: true,
    content: (
      <p>
     
        7 Days hits
      </p>
    ),
  },

   {
    id: "u14",
    sender: "bot",
    animated: true,
    content: (
      <p>
     
        Month
      </p>
    ),
  },
  { id: "l15", sender: "bot", animated: true, content: <p>Simple</p> },

  // IMAGE – Awarded post
  {
    id: "img-1",
    sender: "bot",
    animated: true,
    content: (
     <img src={img3} className="rounded-xl w-60 h-40 object-cover"/>
    ),
  },

  { id: "l16", sender: "bot", animated: true, content: <p>Awarded visual doesn’t disappear</p> },
  { id: "l17", sender: "bot", animated: true, content: <p>It stays visible</p> },
  { id: "l18", sender: "bot", animated: true, content: <p>In one focused space</p> },

  // DECISION 1
  {
    id: "d1",
    sender: "bot",
    type: "decision",
    animated: true,
    content: <p>Want me to continue?</p>,
    options: ["Yeah, go on", "What else?", "Later maybe"],
    answered: false,
  },

  // DECISION 2
  {
    id: "d2",
    sender: "bot",
    type: "decision",
    animated: true,
    content: <p>Should I show you how profiles work?</p>,
    options: ["Show me", "Sounds good", "Skip"],
    answered: false,
  },

  // DECISION 3
  {
    id: "d3",
    sender: "bot",
    type: "decision",
    animated: true,
    content: <p>Want to see where this is heading?</p>,
    options: ["Yeah.", "I’m interested.", "Just browsing."],
    answered: false,
  },

  // OUTRO
  { id: "l19", sender: "bot", animated: true, content: <p>If you’re still here</p> },
  { id: "l20", sender: "bot", animated: true, content: <p>Thanks for looking.</p> },
  { id: "l21", sender: "bot", animated: true, content: <p>Feel free to scroll back.</p> },
  { id: "l22", sender: "bot", animated: true, content: <p>Or stay a bit longer.</p> },
]);



  const PRECHAT_COUNT = 4;
  const BASE_SCROLL_END = 8000;
useEffect(() => {
  const el = msgRefs.current["l1"];
  if (el) {
    gsap.set(el, { opacity: 1, y: -10, marginBottom : 16 });
  }
}, []);
  /* ================= SCRIPTED FLOWS ================= */
const scriptedFlows = {
  d1: {
    "Yeah, go on.": [
      "Creators here can also sell",
      "Digital designs",
      "Visual assets",
      "Clean setup",
      "No unnecessary layers",
      "🖼️ Digital product / asset preview",
      "Brands don’t overpower creators",
      "They collaborate instead",
    ],

    "What else?": [
      "People don’t always work solo",
      "Studios.",
      "Teams.",
      "Groups.",
      "Built around shared vision",
      "🖼️ Group / studio UI",
    ],

    "Later maybe": [
      "That’s fine",
      "You can explore whenever you want",
      "Discovery here is intentional",
      "Not endless scrolling",
      "There’s a space for awarded work",
      "A space to explore everything",
      "And a space for digital supplies",
      "🖼️ Discovery / supplies page",
      "You can save things",
      "Come back to them later",
      "Good work deserves that",
    ],
  },

  d2: {
    "Show me": [
      "Profiles aren’t resumes",
      "They show direction",
      "What you create",
      "What you care about",
      "🖼️ Profile page UI",
    ],

    "Sounds good": [
      "They’re simple",
      "Focused",
      "Built around work — not numbers",
    ],

    "Skip": [
      "No problem",
      "Let’s move on",
      "This project took time",
      "Planning",
      "Designing",
      "Building",
      "Late nights included",
      "🎵 After Hours / late-night track",
      "It’s not finished",
      "It’s still evolving",
    ],
  },

  d3: {
    "Yeah.": [
      "This is planned as a platform",
      "Not just a concept",
      "A beta comes first",
      "🔗 Coming soon / private link",
    ],

    "I’m interested": [
      "That’s good",
      "Early interest matters",
    ],

    "Just browsing.": [
      "That’s okay too",
      "No pressure her.",
      "For now, this lives in my portfolio",
      "As proof",
      "Of how I think",
      "And how I build",
      "🎬 UI motion / Framer Motion clip",
    ],
  },
};
const visibleItems = timeline.filter((item, index) =>
  shouldRenderItem(item, index)
);
  /* ================= SCROLL TIMELINE (rebuild on timeline change) ================= */
  useEffect(() => {
    // build (or rebuild) a fresh GSAP timeline for the current timeline array
    function buildScrollTimeline() {
      scrollTl.current?.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill()); // clear any old triggers

      const tl = gsap.timeline({
        scrollTrigger: {
         trigger: ".scroll-spacer",
          start: "top 60%",
          end: `+=${BASE_SCROLL_END}`, // we'll adjust end below
          scrub: true,
          markers: true,
        },
      });

const total = visibleItems.length;

// how much each message moves container
const LINE_SHIFT = 40;

// how much breathing room you want at end
const END_PADDING = window.innerHeight * 20;

// total vertical movement needed
const contentShift = Math.max(0, total - 1) * LINE_SHIFT;

// final scroll length
const endValue = contentShift + END_PADDING;

gsap.set(".scroll-spacer", {
  height: endValue,
});
   for (let i = 0; i < total; i++) {
  const item = timeline[i];

  // 🔥 Skip animation for Hello
  if (!item.static) {
    tl.fromTo(
      `.line-${i}`,
      { opacity: 0, y: 0 },
      { opacity: 1, y: -20, duration: 1 },
      i * 0.6
    );
  }

  if (i >= 1) {
    tl.to(
      ".fixed-container",
      { y: -i * 40 },
      "<"
    );
  }
}

      // adjust scroll end
      const st = tl.scrollTrigger;
      if (st) {
        st.vars.end = `+=${endValue}`;
        st.end = st.vars.end;
      }

      scrollTl.current = tl;
      ScrollTrigger.refresh();
    }

    buildScrollTimeline();

    return () => {
      scrollTl.current?.kill();
    };
    // Rebuild whenever timeline changes so .line-{index} matches rendered order
  }, [timeline]);

  /* ================= FALLBACK APPEAR ================= */

  // useEffect(() => {
  //   timeline.forEach((item) => {
  //     if (item.animated) return;
  //     const el = msgRefs.current[item.id];
  //     if (!el || el.dataset.animated) return;

  //     el.dataset.animated = "true";

  //     gsap.fromTo(el, { opacity: 0, y: 12 }, { opacity: 1, y: -20, duration: 0.45 , stagger : 0.7});
  //   });
  // }, [timeline.length, isTyping]);  
  /* ================= DECISION HANDLER ================= */
  function handleDecision(id, choice) {
    // insert user reply and scripted bot replies right after the decision item (preserving subsequent timeline items)
    setTimeline((prev) => {
      const idx = prev.findIndex((it) => it.id === id);
      if (idx === -1) return prev;

      // if already answered, ignore
      if (prev[idx].answered) return prev;

      // build user message
      const userMsg = {
        id: `u-${Date.now()}`,
        sender: "user",
        animated: false,
        content: <p>{choice}</p>,
      };

      const scripted = (scriptedFlows[id] && scriptedFlows[id][choice]) || [];
      const botReplies = scripted.map((text, i) => ({
        id: `b-${Date.now()}-${i}`,
        sender: "bot",
        animated: false,
        content: <p className="mb-1">{text}</p>,
      }));

      // produce new decision item with answered flag true (so buttons hide)
      const decisionUpdated = { ...prev[idx], answered: true };

      // assemble new timeline:
      // - items before decision (0..idx-1)
      // - updated decision item
      // - user message
      // - bot replies (scripted)
      // - remaining original items after decision (idx+1 .. end)
      const before = prev.slice(0, idx);
      const after = prev.slice(idx + 1);

      return [...before, decisionUpdated, userMsg, ...botReplies, ...after];
    });
  }

  /* ================= HELPER: control rendering after a decision ================= */
function shouldRenderItem(item, index) {
  // Find the closest decision BEFORE this item
  for (let i = index - 1; i >= 0; i--) {
    const prev = timeline[i];
    if (prev.type === "decision") {
      // if that decision is not answered → block render
      return prev.answered;
    }
  }
  return true; // no decision before → render
}
  /* ================= RENDER ================= */
  function renderMessage(item, index) {
    const isUser = item.sender === "user";
    const isParagraph =
      React.isValidElement(item.content) && item.content.type === "p";

    const bubbleRadius = isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px";

    const bgClass = isUser ? "bg-[#dadada] text-black" : isParagraph ? "bg-black text-white" : "";

    return (
      <div
        key={item.id}
        ref={(el) => (msgRefs.current[item.id] = el)}
        className={`line-${index} mb-1 w-fit max-w-[50vw] ${isUser ? "ml-auto" : ""}`}
      >
        <div className={`${bgClass} px-3 py-1.5`} style={{ borderRadius: bubbleRadius }}>
          {item.content}
        </div>

        {item.type === "decision" && (
          <div className="mt-2 flex fixed  bottom gap-2 w-screen overflow-x-scroll">
            {/* show buttons only if not answered */}
            {!item.answered &&
              item.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleDecision(item.id, opt)}
                  className="px-2 py-1 rounded-full  h-fit  bg-[#dadada] text-sm"
                >
                <p>
                  {opt}
                  
                  </p>  
                </button>
              ))}
          </div>
        )}
      </div>
    );
  }

  /* ================= SEND (LLM) ================= */
  async function handleSend(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    setTimeline((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, sender: "user", animated: false, content: <p>{text}</p> },
    ]);

    setInput("");
    setIsTyping(true);

    try {
      const reply = await sendMessageToBot(text);
      setTimeline((prev) => [
        ...prev,
        { id: `b-${Date.now()}`, sender: "bot", animated: false, content: <p>{reply}</p> },
      ]);
    } finally {
      setIsTyping(false);
    }
  }

  /* ================= JSX ================= */
  return (
    <div className="scroll-spacer w-screen">
      <div className="fixed w-full top-[30vh]">
        <div className="fixed-container flex px-4">
          <div className="flex w-screen gap-1">
            <img className="h-7 w-7 rounded-full" src={img3} alt="avatar" />

            <div className="w-[85vw] mt-2">
              {timeline.map((item, i) =>
                shouldRenderItem(item, i) ? renderMessage(item, i) : null
              )}
              {isTyping && (
                <p className="bg-black text-white px-3 py-1.5 rounded-full">typing…</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="fixed -translate-x-1/2 left-1/2 bottom-20">
        {/* <form onSubmit={handleSend} className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="px-2 py-1 border rounded-full"
          />
          <button className="h-8 w-8 rounded-full bg-black text-white flex items-center justify-center">
            <IoIosSend size={18} />
          </button>
        </form> */}
      </div>
    </div>
  );
}

export default Projects;
