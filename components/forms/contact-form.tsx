"use client";

import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRef } from "react";

import TurnstileField, { type TurnstileInstance } from "@/components/forms/turnstile-field";

import Logo from "@/public/logos/EGS1.png";
import Button from "../button";
import Textarea from "./textarea";
import Input from "./input";
import { useModalStore } from "@/stores/modal-store/modal-store";
import { trackEvent } from "@/lib/analytics";
import { submitWebsiteRequest } from "@/lib/submit-website-request";

const ContactForm = ({ quoteProduct }: { quoteProduct: string | undefined }) => {
    const { openModal, setLoading, closeModal } = useModalStore();
    const turnstileRef = useRef<TurnstileInstance | null>(null);
    const submittingRef = useRef(false);

    const { handleSubmit, getValues, control } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            comment: "",
        },
    });

    const onSubmit = () => {
        openModal("confirmation", {
            title: "Confirm Your Request",
            message: "Confirm your request and someone from our team will contact you shortly.",
            confirmLabel: "Submit Request",
            cancelLabel: "Close",
            onConfirm: submitEstimate,
        });
    };

    const submitEstimate = async () => {
        if (submittingRef.current) return;

        const turnstileToken = turnstileRef.current?.getResponse();

        if (!turnstileToken || turnstileRef.current?.isExpired()) {
            closeModal();
            turnstileRef.current?.reset();
            toast.error("Please complete the security verification, then submit again.");
            return;
        }

        submittingRef.current = true;
        setLoading(true);

        try {
            await submitWebsiteRequest({
                formType: "contact",
                turnstileToken,
                values: {
                    ...getValues(),
                    quoteProduct: quoteProduct ?? "",
                },
            });

            trackEvent("generate_lead", {
                form_name: "contact_request",
            });

            closeModal();
            toast.success("Your request was submitted. Our team will be in touch.");
        } catch (error) {
            closeModal();

            toast.error(error instanceof Error ? error.message : "Your request could not be sent. Please try again.");
        } finally {
            submittingRef.current = false;
            setLoading(false);
            turnstileRef.current?.reset();
        }
    };

    return (
        <section className="relative flex w-full flex-col items-center bg-background py-20 md:px-4">
            {/* FORM CONTAINER */}
            <div className="flex w-11/12 flex-col rounded-2xl border-2 border-border bg-card p-6 text-card-foreground shadow-lg md:w-162.5">
                {/* LOGO */}
                <div className="my-10 flex justify-center">
                    <Image loading="eager" width={150} src={Logo} alt="logo-icon" />
                </div>

                {/* FORM */}
                <form
                    className="w-full self-center md:w-2/3"
                    noValidate
                    onSubmit={(e) => {
                        void handleSubmit(onSubmit)(e);
                    }}
                >
                    {quoteProduct && (
                        <p className="mb-4 rounded-md border border-border bg-muted p-3 text-sm font-semibold">
                            Quote request for {quoteProduct}
                        </p>
                    )}

                    <p className="mb-4 text-sm text-muted-foreground">Fields marked * are required.</p>

                    {/* FIRST NAME */}
                    <Input
                        inputName={"firstName"}
                        required
                        autoComplete="given-name"
                        inputLabel={"First Name"}
                        placeholder={"First Name"}
                        control={control}
                    />

                    {/* LAST NAME */}
                    <Input
                        inputName={"lastName"}
                        required
                        autoComplete="family-name"
                        inputLabel={"Last Name"}
                        placeholder={"Last Name"}
                        control={control}
                    />

                    {/* PHONE NUMBER */}
                    <Input
                        inputName={"phone"}
                        type="tel"
                        autoComplete="tel"
                        inputLabel={"Phone Number"}
                        placeholder={"Phone Number"}
                        control={control}
                    />

                    {/* EMAIL */}
                    <Input
                        inputName={"email"}
                        required
                        type="email"
                        autoComplete="email"
                        inputLabel={"Email"}
                        placeholder={"Email"}
                        control={control}
                    />

                    {/* COMMENT */}
                    <Textarea inputName={"comment"} inputLabel={"Comment"} placeholder={"Comment"} control={control} />

                    <p className="mt-3 text-sm text-muted-foreground">
                        We use your information to respond to this request. See our{" "}
                        <Link href="/privacy" className="font-medium text-primary underline underline-offset-4">
                            Privacy Policy
                        </Link>
                        .
                    </p>
                    <TurnstileField ref={turnstileRef} action="contact" />

                    <div className="my-10">
                        <Button submit themed name="Submit Request" className="w-full justify-center" />
                    </div>
                </form>
            </div>
        </section>
    );
};

export default ContactForm;
