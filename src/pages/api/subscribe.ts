import mailchimp from "@mailchimp/mailchimp_marketing";
import env from "lib/env.server";
import { NextApiRequest, NextApiResponse } from "next";

mailchimp.setConfig({
  apiKey: env.MAILCHIMP_API_KEY,
  server: env.MAILCHIMP_API_SERVER, // e.g. us1
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    await mailchimp.lists.addListMember(env.MAILCHIMP_AUDIENCE_ID, {
      email_address: email,
      status: "subscribed",
    });

    return res.status(201).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message || error.toString() });
  }
}
