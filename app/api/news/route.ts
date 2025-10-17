export const runtime = "edge";
export const revalidate = 600;

// placeholder or old stub
export async function GET() {
  return new Response("OK");
}
