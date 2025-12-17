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


// const [timeline, setTimeline] = useState([
//   { id: "l1", sender: "bot", animated: true, static: true, content: <p>Hey</p> },
//   { id: "l2", sender: "bot", animated: true, content: <p>You’re here</p> },
//   { id: "l3", sender: "bot", animated: true, content: <p>This is a test flow</p> },

//   {
//     id: "d1",
//     sender: "bot",
//     type: "decision",
//     animated: true,
//     content: <p>Continue?</p>,
//     options: ["Yes", "No"],
//     answered: false,
//   },
//   { id: "lee5", sender: "bot", animated: true, content: <p>This is shit</p> },
//   { id: "lddee5", sender: "bot", animated: true, content: <p>This is shit</p> },


//   {
//     id: "d2",
//     sender: "bot",
//     type: "decision",
//     animated: true,
//     content: <p>Want to see more?</p>,
//     options: ["Show me", "Stop here"],
//     answered: false,
//   },
//   { id: "l5", sender: "bot", animated: true, content: <p>This is shit</p> },
//   { id: "l4", sender: "bot", animated: true, content: <p>Welldone</p> },

// ]);


const [timeline, setTimeline] = useState([
  // INTRO
  { id: "l1", sender: "bot", animated: true, static: true, content: <p>Hii</p> },
  { id: "01", sender: "bot", animated: true, static: true, content: <p>Scroll</p> },

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
    options: ["go on", "What else?", "Later maybe"],
    answered: false,
  },
  { id: "ldd18", sender: "bot", animated: true, content: <p>space</p> },

  // DECISION 2
  {
    id: "d2",
    sender: "bot",
    type: "decision",
    animated: true,
    content: <p>Should I show you how profiles work?</p>,
    options: ["Show me", "Sounds good", "nope"],
    answered: false,
  },

  // DECISION 3
  {
    id: "d3",
    sender: "bot",
    type: "decision",
    animated: true,
    content: <p>Want to see where this is heading?</p>,
    options: ["fine", "I’m interested", "Just browsing"],
    answered: false,
  },

  // OUTRO
  { id: "l19", sender: "bot", animated: true, content: <p>If you’re still here</p> },
  { id: "l20", sender: "bot", animated: true, content: <p>Thanks for looking</p> },

  { id: "l22", sender: "bot", animated: true, content: <p>Or stay a bit longer</p> },
]);




const lastCountRef = useRef(0);

    const PRECHAT_COUNT = 4;
    const BASE_SCROLL_END = 8000;
  useEffect(() => {
    const el = msgRefs.current["l1", "01"];
    if (el) {
      gsap.set(el, { opacity: 1 });
    }
  }, []);
    /* ================= SCRIPTED FLOWS ================= */
// const scriptedFlows = {
//   d1: {
//     Yes: [
//       "Nice",
//       "This is a reply",
//       "Only these should animate",
//     ],
//     No: [
//       "Alright",
//       "Stopping here",
//     ],
//   },

//   d2: {
//     "Show me": [
//       "Here’s a bit more",
//       "Second decision works",
//       "Flow continues cleanly",
//     ],
//     "Stop here": [
//       "Cool",
//       "End of test flow",
//     ],
//   },
// };
const scriptedFlows = {
  d1: {
    "go on": [
      "Creators here can also sell",
      "Digital designs",
      "Visual assets",
      {
        sender: "bot",
        animated: true,
        content: (
               <img src={img3} className="rounded-xl w-60 h-40 object-cover"/>

        ),
      },
      "Brands don’t overpower creators",
      "They collaborate instead",
    ],

    "What else?": [
      "People don’t always work solo",
      "Studios",
      "Teams",
      "Groups",
      {
        sender: "bot",
        animated: true,
        content: (
          <div >

               <img src='/discover.png' className="rounded-[6px] w-100 h-30 object-cover border border-[#dadada]"/>

          </div>
        ),
      },
    ],

    "Later maybe": [
      "That’s fine",
      "You can explore whenever you want",
      {
        sender: "bot",
        animated: true,
        content: (
          <div className="rounded-xl w-60 h-32 bg-neutral-800 flex items-center justify-center text-white text-sm">
            Discovery / supplies page
          </div>
        ),
      },
    ],
  },

  d2: {
    "Show me": [
      "Profiles aren’t resumes",
      {
        sender: "bot",
        animated: true,
        content: (
          <div className="rounded-xl w-60 h-32 bg-neutral-800 flex items-center justify-center text-white text-sm">
            Profile page UI
          </div>
        ),
      },
    ],

    "Sounds good": [
      "They’re simple",
      "Focused",
      "Built around work — not numbers",
    ],

    "nope": [
      "No problem",
      "Let’s move on",
      {
        sender: "bot",
        animated: true,
        content: (
          <div className="rounded-xl w-60 h-32 bg-neutral-800 flex items-center justify-center text-white text-sm">
            After Hours / late-night track
          </div>
        ),
      },
    ],
  },

  d3: {
    "fine": [
      "This is planned as a platform",
      {
        sender: "bot",
        animated: true,
        content: (
          <div className="rounded-xl w-60 h-32 bg-neutral-800 flex items-center justify-center text-white text-sm">
            Coming soon / private link
          </div>
        ),
      },
    ],

    "I’m interested": [
      "That’s good",
      "Early interest matters",
    ],

    "Just browsing": [
      "That’s okay too",
      "For now, this lives in my portfolio",
      {
        sender: "bot",
        animated: true,
        content: (
          <div className="rounded-xl w-60 h-32 bg-neutral-800 flex items-center justify-center text-white text-sm">
            UI motion / Framer Motion clip
          </div>
        ),
      },
    ],
  },
};

const resizeTimer = useRef(null);
const resizeObserver = useRef(null);

  const visibleItems = timeline.filter((item, index) =>
    shouldRenderItem(item, index)
  );
    /* ================= SCROLL TIMELINE (rebuild on timeline change) ================= */
useEffect(() => {
  function buildScrollTimeline() {
    // kill previous
    if (scrollTl.current?.scrollTrigger) scrollTl.current.scrollTrigger.kill();
    scrollTl.current?.kill();

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".scroll-spacer",
        start: "top bottom",
        end: `+=${BASE_SCROLL_END}`, // will be updated below
        scrub: true,
      },
    });

    const total = visibleItems.length;

    // measure each visible line: height + marginBottom
    const heights = visibleItems.map((item) => {
      const el = msgRefs.current[item.id];
      if (!el) return 0;
      const rect = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      const mb = parseFloat(style.marginBottom) || 0;
      return rect.height + mb;
    });

    // cumulative sums: cum[i] = sum of heights[0..i-1]
    const cum = [0];
    for (let i = 1; i <= heights.length; i++) {
      cum[i] = (cum[i - 1] || 0) + (heights[i - 1] || 0);
    }

    // final scroll length = total content shift + padding
    const END_PADDING = window.innerHeight * 20;
    const contentShift = cum[total] || 0;
    const endValue = contentShift + END_PADDING;

    gsap.set(".scroll-spacer", { height: endValue });

    // build timeline: reveal each .line-i and move fixed-container by the cumulative height
    for (let i = 0; i < total; i++) {
      const item = visibleItems[i];

      if (!item.static) {
        tl.fromTo(
          `.line-${i}`,
          { opacity: 0, y: 0 },
          { opacity: 1, y: 0, duration: 1 },
          i * 0.6
        );
      }

      if (i >= 1) {
        // move fixed container by the height of all previous lines
        tl.to(".fixed-container", { y: -cum[i] }, "<");
      }
    }

    // update scrollTrigger end
    const st = tl.scrollTrigger;
    if (st) {
      st.vars.end = `+=${endValue}`;
      st.end = st.vars.end;
    }

    scrollTl.current = tl;
    ScrollTrigger.refresh();
  }

  buildScrollTimeline();

  // watch for size changes (images loading / text wrap)
  if (typeof ResizeObserver !== "undefined") {
    resizeObserver.current = new ResizeObserver(() => {
      clearTimeout(resizeTimer.current);
      resizeTimer.current = setTimeout(() => {
        buildScrollTimeline();
      }, 60);
    });

    visibleItems.forEach((it) => {
      const el = msgRefs.current[it.id];
      if (el) resizeObserver.current.observe(el);
    });

    // also rebuild when images inside .scroll-spacer load
    document.querySelectorAll(".scroll-spacer img").forEach((img) => {
      img.addEventListener("load", buildScrollTimeline);
    });
  }

  return () => {
    scrollTl.current?.kill();
    if (resizeObserver.current) {
      resizeObserver.current.disconnect();
      resizeObserver.current = null;
    }
    clearTimeout(resizeTimer.current);
    document.querySelectorAll(".scroll-spacer img").forEach((img) => {
      img.removeEventListener("load", buildScrollTimeline);
    });
  };
}, [visibleItems.length]); // rebuild whenever number of visible items changes

const hasMountedRef = useRef(false);

// useEffect(() => {
//   const currentCount = visibleItems.length;

//   if (!hasMountedRef.current) {
//     hasMountedRef.current = true;
//     lastCountRef.current = currentCount;
//     return;
//   }

//   if (currentCount > lastCountRef.current) {
//     const added = visibleItems.slice(0, currentCount); // take all visible items
//     const totalHeight = added.reduce((acc, it) => {
//       const el = msgRefs.current[it.id];
//       if (!el) return acc;
//       const rect = el.getBoundingClientRect();
//       const style = getComputedStyle(el);
//       const mb = parseFloat(style.marginBottom) || 0;
//       return acc + rect.height + mb;
//     }, 0);

//     gsap.to(".fixed-container", {
//       y: -totalHeight, // <-- absolute value, not relative
//       duration: 0.45,
//       ease: "power3.out",
//       overwrite: "auto",
//     });
//   }

//   lastCountRef.current = currentCount;
// }, [visibleItems.length]);



useEffect(() => {
  const currentCount = visibleItems.length;

  if (!hasMountedRef.current) {
    hasMountedRef.current = true;
    lastCountRef.current = currentCount;
    return;
  }

  if (currentCount > lastCountRef.current) {
    // compute only the newly added items (delta)
    const newItems = visibleItems.slice(lastCountRef.current, currentCount);
    const deltaHeight = newItems.reduce((acc, it) => {
      const el = msgRefs.current[it.id];
      if (!el) return acc;
      const rect = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      const mb = parseFloat(style.marginBottom) || 0;
      return acc + rect.height + mb;
    }, 0);

    if (deltaHeight > 0) {
      // move by the delta (relative), then refresh ScrollTrigger to re-sync everything
const st = scrollTl.current?.scrollTrigger;
if (!st) return;

// move container visually
gsap.to(".fixed-container", {
  y: `-=${deltaHeight}`,
  duration: 0.45,
  ease: "power3.out",
  overwrite: "auto",
});

// ALSO move scroll position forward
const scrollRange = st.end - st.start;
const progressDelta = deltaHeight / scrollRange;

st.scroll(st.scroll() + deltaHeight);
st.update()
    } else {
      // still refresh if nothing moved (safety)
      ScrollTrigger.refresh();
    }
  }

  lastCountRef.current = currentCount;
}, [visibleItems.length]);


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
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function getWordCount(text) {
  return text.trim().split(/\s+/).length;
}

// thinking before typing (0.2s – 0.4s)
function getThinkingDelay() {
  return 200 + Math.random() * 600;
}

// typing duration based on words
function getTypingDuration(text) {
  const words = getWordCount(text);
  return words * (200 + Math.random() * 40);
}

// mid-thinking pause for long messages
function getMidPause(text) {
  const words = getWordCount(text);
  if (words < 10) return 0;

  return 150 + Math.random() * 250;
}

// async function handleDecision(id, choice) {
//   const scripted = scriptedFlows[id]?.[choice] || [];
//   let continuation = [];

//   // 1️⃣ Insert user choice + REMOVE continuation from timeline
//   setTimeline((prev) => {
//     const idx = prev.findIndex((it) => it.id === id);
//     if (idx === -1 || prev[idx].answered) return prev;

//     continuation = prev.slice(idx + 1);

//     return [
//       ...prev.slice(0, idx),
//       { ...prev[idx], answered: true },
//       {
//         id: `u-${Date.now()}`,
//         sender: "user",
//         animated: true,
//         justAdded: true,
//         content: <p>{choice}</p>,
//       },
//     ];
//   });

//   // 2️⃣ SCRIPTED REPLIES (typing + animation)
//   for (let i = 0; i < scripted.length; i++) {
//     const text = scripted[i];

//     await sleep(getThinkingDelay());

//     setIsTyping(true);
//     await sleep(getTypingDuration(text));

//     const midPause = getMidPause(text);
//     if (midPause) {
//       setIsTyping(false);
//       await sleep(midPause);
//       setIsTyping(true);
//       await sleep(120 + Math.random() * 180);
//     }

//     setIsTyping(false);

//     setTimeline((prev) => [
//       ...prev,
//       {
//         id: `b-${Date.now()}-${i}`,
//         sender: "bot",
//         animated: true,
//         justAdded: true,
//         content: <p className="">{text}</p>,
//       },
//     ]);
//   }

//   // 3️⃣ CONTINUATION (l4, l5…) WITH SAME TYPING FLOW
//   for (let i = 0; i < continuation.length; i++) {
//     const item = continuation[i];

//     // If the next item is a decision -> append that decision AND
//     // reattach the rest of the continuation so later answering can continue it
//     if (item.type === "decision") {
//       setIsTyping(false);

//       const rest = continuation.slice(i + 1);

//       setTimeline((prev) => [
//         ...prev,
//         {
//           ...item,
//           animated: true,
//           justAdded: true,
//         },
//         // re-attach remaining items so they exist in the timeline.
//         // They will remain hidden by shouldRenderItem until this decision is answered.
//         ...rest.map((m) => ({ ...m, animated: false })),
//       ]);

//       break;
//     }

//     // normal message -> simulate typing then append
//     const text =
//       typeof item.content?.props?.children === "string"
//         ? item.content.props.children
//         : "";

//     await sleep(getThinkingDelay());

//     setIsTyping(true);
//     await sleep(getTypingDuration(text));
//     setIsTyping(false);

//     setTimeline((prev) => [
//       ...prev,
//       {
//         ...item,
//         animated: true,
//         justAdded: true,
//       },
//     ]);
//   }
// }
async function handleDecision(id, choice) {
  const scripted = scriptedFlows[id]?.[choice] || [];
  let continuation = [];

  // 1️⃣ Insert user choice + REMOVE continuation from timeline
  setTimeline((prev) => {
    const idx = prev.findIndex((it) => it.id === id);
    if (idx === -1 || prev[idx].answered) return prev;

    continuation = prev.slice(idx + 1);

    return [
      ...prev.slice(0, idx),
      { ...prev[idx], answered: true },
      {
        id: `u-${Date.now()}`,
        sender: "user",
        animated: true,
        justAdded: true,
        content: <p>{choice}</p>,
      },
    ];
  });

  // 2️⃣ SCRIPTED REPLIES (NOW SUPPORTS ANY ITEM)
  for (let i = 0; i < scripted.length; i++) {
    const entry = scripted[i];
    const isString = typeof entry === "string";

    const text =
      isString
        ? entry
        : typeof entry?.content?.props?.children === "string"
        ? entry.content.props.children
        : "";

    if (text) {
      await sleep(getThinkingDelay());

      setIsTyping(true);
      await sleep(getTypingDuration(text));

      const midPause = getMidPause(text);
      if (midPause) {
        setIsTyping(false);
        await sleep(midPause);
        setIsTyping(true);
        await sleep(120 + Math.random() * 180);
      }

      setIsTyping(false);
    }

    setTimeline((prev) => [
      ...prev,
      {
        id: `b-${Date.now()}-${i}`,
        sender: "bot",
        animated: true,
        justAdded: true,
        ...(isString ? { content: <p>{entry}</p> } : entry),
      },
    ]);
  }

  // 3️⃣ CONTINUATION (UNCHANGED)
  for (let i = 0; i < continuation.length; i++) {
    const item = continuation[i];

    if (item.type === "decision") {
      setIsTyping(false);
      await sleep(150);

      const rest = continuation.slice(i + 1);

      setTimeline((prev) => [
        ...prev,
        { ...item, animated: true, justAdded: true },
        ...rest.map((m) => ({ ...m, animated: false })),
      ]);

      break;
    }

    const text =
      typeof item.content?.props?.children === "string"
        ? item.content.props.children
        : "";

    await sleep(getThinkingDelay());
    setIsTyping(true);
    await sleep(getTypingDuration(text));
    setIsTyping(false);

    setTimeline((prev) => [
      ...prev,
      { ...item, animated: true, justAdded: true },
    ]);
  }
}

useEffect(() => {
  gsap.set(".more", { opacity: 1 });

  const tween = gsap.to(".more", {
    opacity: 0,

    ease: "none",
    scrollTrigger: {
      trigger: document.body,   // 🔥 NOT scroll-spacer
      start: "top top",
      end: "+=300",
      scrub: true,
      invalidateOnRefresh: false,
    },
  });

  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
  };
}, []);

useEffect(() => {
  timeline.forEach((item) => {
    if (!item.justAdded) return;

    const el = msgRefs.current[item.id];
    if (!el) return;

    el.dataset.animated = "true";

    gsap.fromTo(
      el,
      { opacity: 0, y: 12 },
      {
        opacity: 1,
        y: 0,
        duration: 0,
        ease: "power2.out",
        onComplete: () => {
          setTimeline((prev) =>
            prev.map((m) =>
              m.id === item.id ? { ...m, justAdded: false } : m
            )
          );
        },
      }
    );
  });
}, [timeline]);

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
      const bubbleRadiusRev = isUser ? "18px 4px 18px 18px" : "4px 18px 18px 18px";


      const bgClass = isUser ? "bg-[#dadada] text-black" : isParagraph ? "bg-black text-white" : "";

      return (
        <div
          key={item.id}
          ref={(el) => (msgRefs.current[item.id] = el)}
          className={`line-${index} mb-1 w-fit max-w-[50vw] ${isUser ? "ml-auto" : ""}`}
        >
          <div className={`${bgClass} px-3 py-1.5`} style={{ borderRadius: index % 2 === 0 ? bubbleRadius : bubbleRadiusRev}}>
            {item.content}
          </div>

          {item.type === "decision" && (
            <div className="mt-2 flex fixed  bottom gap-2 w-screen">
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

<div className="more">


        <div className="flex gap-3 fixed top-[50vh] right-20 ">
              <img className="h-6 w-6 rounded-full " src={img3} alt="avatar" />

          <p style={{borderRadius : "18px 18px 18px 4px"}} className="bg-black py-1.5 w-fit text-white px-3">Welcome</p>
        </div>

    <div className="flex gap-3 fixed top-[70vh] right-60 ">
              <img className="h-6 w-6 rounded-full " src={img3} alt="avatar" />

          <p style={{borderRadius : "18px 18px 18px 4px"}} className="bg-black py-1.5 w-fit text-white px-3">I'm fuckin' creative</p>
        </div>

    <div className="flex gap-3 fixed top-[20vh] right-30 ">
              <img className="h-6 w-6 rounded-full " src={img3} alt="avatar" />

          <p style={{borderRadius : "18px 18px 18px 4px"}} className="bg-black py-1.5 w-fit text-white px-3">let's chat</p>
        </div>

            <div className="flex gap-3 fixed top-[80vh] right-10 ">
              <img className="h-6 w-6 rounded-full " src={img3} alt="avatar" />

          <p style={{borderRadius : "18px 18px 18px 4px"}} className="bg-black py-1.5 w-fit text-white px-3">listen to me</p>
        </div>
        
</div>
        <div className="fixed w-full top-[30vh]">
          <div className="fixed-container  flex px-4">
            <div className="flex w-screen  gap-1">
              <img className="h-6 w-6 rounded-full" src={img3} alt="avatar" />

              <div className="w-[85vw]  mt-2">
                {timeline.map((item, i) =>
                  shouldRenderItem(item, i) ? renderMessage(item, i) : null
                )}
                {isTyping && (
                  <p className="bg-[#dadada]  w-fit px-2 py-1 rounded-full">typing..</p>
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
