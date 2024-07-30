import { Text, Img } from "..";
import React from "react";

export default function ProfileEmail({
  lockImage = "img_lock.svg",
  emailLabel = "Email",
  emailText = "jakegyll@email.com",
  ...props
}) {
  return (
    <div
      {...props}
      className={`${props.className} flex justify-center items-start gap-3.5 flex-1`}
    >
      <div>
        <Img
          src={`/images/${lockImage}`}
          alt="lock image"
          className="h-[24px] w-[24px]"
        />
      </div>
      <div className="flex flex-1 flex-col items-start justify-center gap-1.5 self-center">
        <Text as="p">{emailLabel}</Text>
        <Text as="p" className="!text-cyan-900">
          {emailText}
        </Text>
      </div>
    </div>
  );
}
