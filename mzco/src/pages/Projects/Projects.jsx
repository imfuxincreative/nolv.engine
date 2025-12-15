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
    { id: "l1", sender: "bot", animated: true, content: <p>Hey</p> },
    { id: "l2", sender: "bot", animated: true, content: <p>yeah!</p> },
    { id: "l3", sender: "bot", animated: true, content: <p>You made it</p> },
    { id: "l4", sender: "bot", animated: true, content: <p>Stay for a bit</p> },

    // Decision is now part of the timeline (id matches scriptedFlows below)
    {
      id: "l5",
      sender: "bot",
      type: "decision",
      animated: true,
      content: <p>Will I show you ?</p>,
      options: ["Nice!", "Hello", "cool"],
      answered: false,
    },

    // This should appear after the decision + its replies
    { id: "l6", sender: "bot", animated: true, content: <p>It been over 4 month</p> },
    {
      id: "l7",
      sender: "bot",
      type: "decision",
      animated: true,
      content: <p>I'm fuckin' creative is'nt it ?</p>,
      options: ["Huh!", "I ain't", "never"],
      answered: false,
    },
    { id: "l8", sender: "bot", animated: true, content: <p>I don't care</p> },
  ]);

  const PRECHAT_COUNT = 4;
  const BASE_SCROLL_END = 8000;

  /* ================= SCRIPTED FLOWS ================= */
  const scriptedFlows = {
    // key matches the decision item's id "l5"
    l5: {
      Yeah: [
        "Of course — I was hoping you'd say that.",
        "Let me show you what I've been building.",
      ],
      "Maybe later": [
        "No rush at all.",
        "You can explore whenever you feel ready.",
      ],
      "Show me the live link": ["Alright, here you go 👇", "https://your-live-link.com"],
    },
    l7: {
      "Huh!": [
        "Of course — I was hoping you'd say that.",
        "Let me show you what I've been building.",
      ],
      "I don't know": [
        "No rush at all.",
        "You can explore whenever you feel ready.",
      ],
      "noo fuck!": ["Alright, here you go 👇", "https://your-live-link.com"],
    },
  };

  /* ================= SCROLL TIMELINE (rebuild on timeline change) ================= */
  useEffect(() => {
    // build (or rebuild) a fresh GSAP timeline for the current timeline array
    function buildScrollTimeline() {
      scrollTl.current?.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill()); // clear any old triggers

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".fixed-container",
          start: "top 20%",
          end: `+=${BASE_SCROLL_END}`, // we'll adjust end below
          scrub: true,
          // markers: true,
        },
      });

      const total = timeline.length;
      const extraPerItem = 800;
      const extraCount = Math.max(0, total - PRECHAT_COUNT);
      const endValue = BASE_SCROLL_END + extraPerItem * extraCount;

      // create fromTo animations for every item in timeline (indexed)
      for (let i = 0; i < total; i++) {
        tl.fromTo(
          `.line-${i}`,
          { opacity: 0, y: 0 },
          { opacity: 1, y: -20, duration: 1 },
          i * 0.6
        );

        if (i >= 1) {
          tl.to(
            ".fixed-container",
            { y: -i * 40, duration: 1, ease: "power2.out" },
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
  useEffect(() => {
    timeline.forEach((item) => {
      if (item.animated) return;
      const el = msgRefs.current[item.id];
      if (!el || el.dataset.animated) return;

      el.dataset.animated = "true";

      gsap.fromTo(el, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45 });
    });
  }, [timeline.length, isTyping]);

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
        content: <p className="mt-1">{text}</p>,
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
        className={`line-${index} mb-1 w-fit max-w-[40vw] ${isUser ? "ml-auto" : ""}`}
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
    <div className="h-[3000vh] w-screen">
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
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="px-2 py-1 border rounded-full"
          />
          <button className="h-8 w-8 rounded-full bg-black text-white flex items-center justify-center">
            <IoIosSend size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Projects;
