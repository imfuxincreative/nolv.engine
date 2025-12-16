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
  { id: "l1", sender: "bot", animated: true, static: true, content: <p>Hey</p> },
  { id: "l2", sender: "bot", animated: true, content: <p>You’re here</p> },
  { id: "l3", sender: "bot", animated: true, content: <p>This is a test flow</p> },

  {
    id: "d1",
    sender: "bot",
    type: "decision",
    animated: true,
    content: <p>Continue?</p>,
    options: ["Yes", "No"],
    answered: false,
  },
  { id: "lee5", sender: "bot", animated: true, content: <p>This is shit</p> },
  { id: "lddee5", sender: "bot", animated: true, content: <p>This is shit</p> },


  {
    id: "d2",
    sender: "bot",
    type: "decision",
    animated: true,
    content: <p>Want to see more?</p>,
    options: ["Show me", "Stop here"],
    answered: false,
  },
  { id: "l5", sender: "bot", animated: true, content: <p>This is shit</p> },
  { id: "l4", sender: "bot", animated: true, content: <p>Welldone</p> },

]);


const lastCountRef = useRef(0);

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
    Yes: [
      "Nice",
      "This is a reply",
      "Only these should animate",
    ],
    No: [
      "Alright",
      "Stopping here",
    ],
  },

  d2: {
    "Show me": [
      "Here’s a bit more",
      "Second decision works",
      "Flow continues cleanly",
    ],
    "Stop here": [
      "Cool",
      "End of test flow",
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
            start: "top 80%",
            end: `+=${BASE_SCROLL_END}`, // we'll adjust end below
            scrub: true,
            // markers: true,
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
        { opacity: 1, y: 0, duration: 1 },
        i * 0.6
      );
    }

    if (i >= 1) {
      tl.to(
        ".fixed-container",
        { y: -i * 40, },
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
    }, [visibleItems.length]);
useEffect(() => {
  const currentCount = visibleItems.length;

  if (currentCount > lastCountRef.current) {
    const delta = currentCount - lastCountRef.current;

    // move more than 40 to avoid opacity stacking
    const SHIFT_PER_LINE = 40; // 👈 increase spacing
    const moveBy = delta * SHIFT_PER_LINE;

    gsap.to(".fixed-container", {
      y: `-=${moveBy}`,
      duration: 0.45,
      ease: "power3.out",
      overwrite: "auto",
    });
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
  return 200 + Math.random() * 400;
}

// typing duration based on words
function getTypingDuration(text) {
  const words = getWordCount(text);
  return words * (80 + Math.random() * 40);
}

// mid-thinking pause for long messages
function getMidPause(text) {
  const words = getWordCount(text);
  if (words < 10) return 0;

  return 150 + Math.random() * 250;
}

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

  // 2️⃣ SCRIPTED REPLIES (typing + animation)
  for (let i = 0; i < scripted.length; i++) {
    const text = scripted[i];

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

    setTimeline((prev) => [
      ...prev,
      {
        id: `b-${Date.now()}-${i}`,
        sender: "bot",
        animated: true,
        justAdded: true,
        content: <p className="">{text}</p>,
      },
    ]);
  }

  // 3️⃣ CONTINUATION (l4, l5…) WITH SAME TYPING FLOW
  for (let i = 0; i < continuation.length; i++) {
    const item = continuation[i];

    // If the next item is a decision -> append that decision AND
    // reattach the rest of the continuation so later answering can continue it
    if (item.type === "decision") {
      setIsTyping(false);

      const rest = continuation.slice(i + 1);

      setTimeline((prev) => [
        ...prev,
        {
          ...item,
          animated: true,
          justAdded: true,
        },
        // re-attach remaining items so they exist in the timeline.
        // They will remain hidden by shouldRenderItem until this decision is answered.
        ...rest.map((m) => ({ ...m, animated: false })),
      ]);

      break;
    }

    // normal message -> simulate typing then append
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
      {
        ...item,
        animated: true,
        justAdded: true,
      },
    ]);
  }
}



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
        duration: 0.45,
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
          <div className="fixed-container  flex px-4">
            <div className="flex w-screen translate-y-50 gap-1">
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
