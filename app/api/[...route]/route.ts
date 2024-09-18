import { Hono } from "hono";
import { handle } from "hono/vercel";
import { contextStorage, getContext } from "hono/context-storage";

const ZOOM_ENDPOINT = "https://api.zoom.us/v2/";

export const runtime = "edge";

type Env = {
  Variables: {
    token: string;
  };
};
const app = new Hono<Env>().basePath("/api");
app.use(contextStorage());

// app.use(async (context, next) => {
//   context.set("token", "");
//   await next();
// });

type Token = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  api_url: string;
};

let cachedToken: string | null = null;

app.get("/get-zoom-token", async (context) => {
  const auth = Buffer.from(
    `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`,
  ).toString("base64");

  try {
    const result = await fetch("https://zoom.us/oauth/token", {
      method: "POST",
      body: new URLSearchParams({
        grant_type: "account_credentials",
        account_id: process.env.ACCOUNT_ID || "",
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${auth}`,
      },
    });
    const data = (await result.json()) as Token;
    cachedToken = data.access_token;
    // console.log("トークン1", data.access_token);
    // context.set("token", data.access_token);

    return context.json(data);
  } catch (error) {
    return context.json(
      {
        error: "failed",
      },
      500,
    );
  }
});

app.get("/me", async (context) => {
  // const token = getContext<Env>().var.token;
  // console.log("トークン2", token);
  try {
    const result = await fetch(`${ZOOM_ENDPOINT}users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cachedToken}`,
      },
    });
    const data = await result.json();
    console.log("テスト", data);

    return context.json(data);
  } catch (error) {
    return context.json(
      {
        error: "failed",
      },
      500,
    );
  }
});

export const GET = handle(app);
