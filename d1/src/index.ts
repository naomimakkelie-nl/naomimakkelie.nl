export interface Env {
  DB: D1Database;
  ALLOWED_ORIGINS: string[];
  HTTP_HEADER__ACCESS_CONTROL_ALLOW_ORIGIN: string;
  HTTP_HEADER__ACCESS_CONTROL_ALLOW_METHODS: string;
}

export default {
  async fetch(request: Request, env: Env) {
    const headers = new Headers({
      ...createCORSHeaders(request, env),
    });

    const db = createDatabaseClient(env);
    const { pathname } = new URL(request.url);

    if (pathname === "/api/newsletter/subscribe" && request.method === "POST") {
      const body = await readRequestBody(request);
      if (await db.newsletter.isSubscribed(body.email)) {
        return Response.json({code: "ALREADY_SUBSCRIBED"}, {headers});
      }
      await db.newsletter.subscribe(body.email);
      return Response.json({code: "SUCCESS"}, {headers});
    } else if (pathname === "/api/newsletter/subscribe" && request.method === "OPTIONS") {
      return new Response({headers});
    }

    if (pathname.startsWith("/api/newsletter/unsubscribe") && request.method === "GET") {
      const token = new URL(request.url).searchParams.get('token');
      if (await db.newsletter.isTokenValid(token)) {
        await db.newsletter.unsubscribe(token);
        return Response.json({code: "UNSUBSCRIBED_SUCCESSFULLY"}, {status: 200, headers});
      } else {
        return Response.json({code: "INVALID_TOKEN"}, {status: 400, headers});
      }
    }

    return Response.json({code: "PAGE_NOT_FOUND"}, {status: 404, headers});
  },
};

function isRequestFromWhitelistedOrigin(request: Request, {ALLOWED_ORIGINS}: Env) {
  return ALLOWED_ORIGINS.includes(request.headers.get("origin"));
}

function createCORSHeaders(request: Request, {HTTP_HEADER__ACCESS_CONTROL_ALLOW_METHODS, ...env}: Env) {
  if (!isRequestFromWhitelistedOrigin(request, env)) {
    return {};
  }

  return {
    "Access-Control-Allow-Origin": request.headers.get("origin"),
    "Access-Control-Allow-Methods": HTTP_HEADER__ACCESS_CONTROL_ALLOW_METHODS,
  }; 
}

function normalizeEmail(email: string) {
  return email.toLowerCase();
}

function createDatabaseClient(env: Env) {
  const db = env.DB;
  const client = {
    newsletter: {
      async isSubscribed(email: string) {
        return (await db.prepare("SELECT email FROM newsletter_subscribers WHERE email = ? LIMIT 1").bind(normalizeEmail(email)).all()).results.length === 1;
      },
      async subscribe(email: string) {
        const token = generateToken();
        return db.prepare("INSERT INTO newsletter_subscribers (email, unsubscribe_token) VALUES (?, ?)").bind(normalizeEmail(email), token).all();
      },
      async isTokenValid(token: string) {
        return (await db.prepare("SELECT unsubscribe_token FROM newsletter_subscribers WHERE unsubscribe_token = ? LIMIT 1").bind(token).all()).results.length === 1;
      },
      async unsubscribe(token: string) {
        return db.prepare("DELETE FROM newsletter_subscribers WHERE unsubscribe_token = ?").bind(token).all();
      }
    }
  };

  return client;
}

async function readRequestBody(request) {
  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return request.json();
  } else if (contentType.includes("form")) {
    return Object.fromEntries((await request.formData()).entries());
  }
}

function generateToken(): string {
  // Use a secure method to generate a random token
  // This is a placeholder and should be replaced with an actual secure token generation method
  return Math.random().toString(36).substr(2);
}

