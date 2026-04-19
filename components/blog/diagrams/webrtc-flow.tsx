export function WebRTCFlow() {
  const lanes = [
    { label: "Browser", x: 90 },
    { label: "Fermax REST", x: 290 },
    { label: "Signaling", x: 490 },
    { label: "Panel", x: 690 },
  ];

  const laneTop = 50;
  const laneBottom = 490;

  return (
    <svg
      viewBox="0 0 780 530"
      className="mx-auto w-full max-w-2xl"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Sequence diagram of the Fermax WebRTC video session flow"
    >
      <defs>
        <marker
          id="arrowhead"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
        </marker>
        <marker
          id="arrowhead-accent"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--accent))" />
        </marker>
      </defs>

      {/* Lane labels and vertical guides */}
      {lanes.map((lane) => (
        <g key={lane.label}>
          <text
            x={lane.x}
            y="30"
            textAnchor="middle"
            className="fill-foreground font-serif text-[14px]"
          >
            {lane.label}
          </text>
          <line
            x1={lane.x}
            y1={laneTop}
            x2={lane.x}
            y2={laneBottom}
            stroke="hsl(var(--border))"
            strokeWidth="1"
            strokeDasharray="2 4"
          />
        </g>
      ))}

      {/* 1. POST /autoon : Browser -> REST */}
      <g className="text-foreground">
        <line
          x1="90"
          y1="80"
          x2="290"
          y2="80"
          stroke="currentColor"
          strokeWidth="1.5"
          markerEnd="url(#arrowhead)"
        />
        <text
          x="190"
          y="72"
          textAnchor="middle"
          className="fill-muted-foreground text-[11px] font-mono"
        >
          1. POST /autoon
        </text>
      </g>

      {/* 2. wake : REST -> Panel (through signaling conceptually) */}
      <g className="text-foreground">
        <line
          x1="290"
          y1="115"
          x2="690"
          y2="115"
          stroke="currentColor"
          strokeWidth="1.5"
          markerEnd="url(#arrowhead)"
        />
        <text
          x="490"
          y="107"
          textAnchor="middle"
          className="fill-muted-foreground text-[11px] font-mono"
        >
          2. wake panel
        </text>
      </g>

      {/* 3. on-browser-autoon : Signaling -> Browser (BROADCAST, accent) */}
      <g>
        <line
          x1="490"
          y1="160"
          x2="90"
          y2="160"
          stroke="hsl(var(--accent))"
          strokeWidth="1.5"
          markerEnd="url(#arrowhead-accent)"
        />
        <text
          x="290"
          y="152"
          textAnchor="middle"
          className="text-[11px] font-mono"
          fill="hsl(var(--accent))"
        >
          {"3. on-browser-autoon  {roomId, deviceId}"}
        </text>
        <text
          x="290"
          y="176"
          textAnchor="middle"
          className="text-[10px] italic"
          fill="hsl(var(--accent))"
        >
          broadcast to every connected socket
        </text>
      </g>

      {/* 4. join_call : Browser -> Signaling */}
      <g className="text-foreground">
        <line
          x1="90"
          y1="220"
          x2="490"
          y2="220"
          stroke="currentColor"
          strokeWidth="1.5"
          markerEnd="url(#arrowhead)"
        />
        <text
          x="290"
          y="212"
          textAnchor="middle"
          className="fill-muted-foreground text-[11px] font-mono"
        >
          4. join_call(roomId)
        </text>
      </g>

      {/* 5. transport_consume : Signaling -> Browser */}
      <g className="text-foreground">
        <line
          x1="490"
          y1="255"
          x2="90"
          y2="255"
          stroke="currentColor"
          strokeWidth="1.5"
          markerEnd="url(#arrowhead)"
        />
        <text
          x="290"
          y="247"
          textAnchor="middle"
          className="fill-muted-foreground text-[11px] font-mono"
        >
          5. transport_consume (mediasoup params)
        </text>
      </g>

      {/* 6. media stream : Panel -> Browser (dashed, sustained) */}
      <g className="text-foreground">
        <line
          x1="690"
          y1="300"
          x2="90"
          y2="300"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="6 3"
          markerEnd="url(#arrowhead)"
        />
        <text
          x="390"
          y="292"
          textAnchor="middle"
          className="fill-muted-foreground text-[11px] font-mono"
        >
          6. H.264 video + G.711 audio
        </text>
      </g>

      {/* ~30s separator */}
      <g>
        <line
          x1="90"
          y1="360"
          x2="690"
          y2="360"
          stroke="hsl(var(--border))"
          strokeWidth="1"
          strokeDasharray="2 3"
        />
        <text
          x="390"
          y="352"
          textAnchor="middle"
          className="fill-muted-foreground text-[10px] italic"
        >
          ~30 seconds later
        </text>
      </g>

      {/* 7. end_up : Signaling -> Browser */}
      <g className="text-foreground">
        <line
          x1="490"
          y1="400"
          x2="90"
          y2="400"
          stroke="currentColor"
          strokeWidth="1.5"
          markerEnd="url(#arrowhead)"
        />
        <text
          x="290"
          y="392"
          textAnchor="middle"
          className="fill-muted-foreground text-[11px] font-mono"
        >
          7. end_up (reason: missed_call)
        </text>
      </g>

      {/* 8. reconnect loop : Browser back to REST */}
      <g>
        <path
          d="M 90 445 Q 60 470, 90 475 L 290 475"
          stroke="hsl(var(--accent))"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="4 3"
          markerEnd="url(#arrowhead-accent)"
        />
        <text
          x="190"
          y="465"
          textAnchor="middle"
          className="text-[11px] font-mono"
          fill="hsl(var(--accent))"
        >
          8. wait 1s, loop from step 1
        </text>
      </g>
    </svg>
  );
}
