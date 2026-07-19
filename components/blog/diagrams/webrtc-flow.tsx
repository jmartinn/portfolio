import { Diagram } from "./diagram";
import { ArrowMarkers } from "./markers";
import { stage } from "./stage";

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
    <Diagram>
      <svg
        viewBox="0 0 780 530"
        className="mx-auto w-full max-w-2xl"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Sequence diagram of the Fermax WebRTC video session flow"
      >
        <ArrowMarkers prefix="wf" />

        {/* Lane labels and vertical guides */}
        {lanes.map((lane) => (
          <g key={lane.label}>
            <text
              x={lane.x}
              y="30"
              textAnchor="middle"
              className="dg-fade fill-foreground font-serif text-[14px]"
              style={stage(0)}
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
              className="dg-drop"
              style={stage(0)}
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
            markerEnd="url(#wf-arrow)"
            className="dg-wipe"
            style={stage(1)}
          />
          <text
            x="190"
            y="72"
            textAnchor="middle"
            className="dg-rise fill-muted-foreground font-mono text-[11px]"
            style={stage(1)}
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
            markerEnd="url(#wf-arrow)"
            className="dg-wipe"
            style={stage(2)}
          />
          <text
            x="490"
            y="107"
            textAnchor="middle"
            className="dg-rise fill-muted-foreground font-mono text-[11px]"
            style={stage(2)}
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
            markerEnd="url(#wf-arrow-accent)"
            className="dg-wipe-r"
            style={stage(3)}
          />
          <text
            x="290"
            y="152"
            textAnchor="middle"
            className="dg-rise font-mono text-[11px]"
            fill="hsl(var(--accent))"
            style={stage(3)}
          >
            {"3. on-browser-autoon  {roomId, deviceId}"}
          </text>
          <text
            x="290"
            y="176"
            textAnchor="middle"
            className="dg-rise text-[10px] italic"
            fill="hsl(var(--accent))"
            style={stage(3)}
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
            markerEnd="url(#wf-arrow)"
            className="dg-wipe"
            style={stage(4)}
          />
          <text
            x="290"
            y="212"
            textAnchor="middle"
            className="dg-rise fill-muted-foreground font-mono text-[11px]"
            style={stage(4)}
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
            markerEnd="url(#wf-arrow)"
            className="dg-wipe-r"
            style={stage(5)}
          />
          <text
            x="290"
            y="247"
            textAnchor="middle"
            className="dg-rise fill-muted-foreground font-mono text-[11px]"
            style={stage(5)}
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
            markerEnd="url(#wf-arrow)"
            className="dg-wipe-r"
            style={stage(6)}
          />
          <text
            x="390"
            y="292"
            textAnchor="middle"
            className="dg-rise fill-muted-foreground font-mono text-[11px]"
            style={stage(6)}
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
            className="dg-fade"
            style={stage(7)}
          />
          <text
            x="390"
            y="352"
            textAnchor="middle"
            className="dg-fade fill-muted-foreground text-[10px] italic"
            style={stage(7)}
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
            markerEnd="url(#wf-arrow)"
            className="dg-wipe-r"
            style={stage(7)}
          />
          <text
            x="290"
            y="392"
            textAnchor="middle"
            className="dg-rise fill-muted-foreground font-mono text-[11px]"
            style={stage(7)}
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
            markerEnd="url(#wf-arrow-accent)"
            className="dg-wipe"
            style={stage(8)}
          />
          <text
            x="190"
            y="465"
            textAnchor="middle"
            className="dg-rise font-mono text-[11px]"
            fill="hsl(var(--accent))"
            style={stage(8)}
          >
            8. wait 1s, loop from step 1
          </text>
        </g>
      </svg>
    </Diagram>
  );
}
