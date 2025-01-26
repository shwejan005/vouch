import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { Webhook } from "svix"
import { WebhookEvent } from "@clerk/nextjs/server"

const http = httpRouter()

http.route({
    path : "/clerk-webhook",
    method : "POST",
    handler : httpAction(async (ctx,request) => {
        const webhookSecret = process.env.CLERK_WEBHOOK_SECRET
        if(!webhookSecret){
            throw new Error("CLERK_WEBHOOK_SECRET not set")
        }
        const svix_id = request.headers.get("svix-id")
        const svix_signature = request.headers.get("svix-signature")
        const timestamp = request.headers.get("svix-timestamp")

        if ( !svix_id || !svix_signature || !timestamp){
            return new Response("Missing headers", {status : 400})
        }

        const payload = await request.json()
        const body = JSON.stringify(payload)

        const wh = new Webhook(webhookSecret)
    })
})