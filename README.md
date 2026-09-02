Easy Buckets

A basketball statistics tracking application for scoring games and reviewing player and season performance with interactive data visualisation.

Live Demo

https://easy-buckets-web.vercel.app/
Guest info for setup with a game to view and a draft game to score already set up:

login: guest@easybuckets.com
password: Gu34t

Overview

Easy Buckets lets you track player statlines across games and seasons, tag stats directly to moments in game footage, and review performance through dedicated interactive interfaces. 

Features
Live scoring interface for recording stats during a game with real time API updates to stats
Court based interactive shot charting
Video integration via the YouTube IFrame API, allowing stats to be tagged to specific timestamps
Game level stats view for reviewing a single game's box score and shot chart
Season level stats view for aggregating performance across a full season with interactive player shot highlighting.
Editing of players and seasons.

Screenshots (set up using personal account anon data with video replay) 

Scoring Interface

<img width="2658" height="1341" alt="scoringView" src="https://github.com/user-attachments/assets/3e8341e2-2ed0-43f2-b36f-f79fcec9fa81" />


Game Stats Interface

<img width="2271" height="1326" alt="ViewStats" src="https://github.com/user-attachments/assets/4f2e538a-b7f0-4a3b-a6af-d665c4c5658b" />


Season Stats Interface

<img width="2121" height="1341" alt="seasonStatView" src="https://github.com/user-attachments/assets/1771c9b4-6aa8-4e5a-a1f9-ed45fc42124f" />


Tech Stack

Frontend

React + Vite
TypeScript
react youtube (YouTube IFrame API integration)
Zod

Backend

NodeJs
Typescript
Express
Prisma ORM
Zod
bcryptjs
JWT
