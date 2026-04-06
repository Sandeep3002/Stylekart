"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
    const [inputValue, setInputValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otpValue, setOtpValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    // Simple heuristic: if it contains an '@', it's an email, otherwise treat as phone number.
    const isEmail = inputValue.includes("@");
    const isPhone = inputValue.length > 0 && !isEmail;

    const handleSendOTP = async () => {
        if (!inputValue) return;
        setLoading(true);
        setErrorMsg("");
        try {
            const res = await fetch("/api/otp/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone: inputValue })
            });
            const data = await res.json();
            if (data.success) {
                setOtpSent(true);
                alert("OTP sent: 123456 (Demo)"); // Using alert for demo simplicity
            } else {
                setErrorMsg(data.message || "Failed to send OTP");
            }
        } catch (error) {
            setErrorMsg("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async () => {
        if (!otpValue) return;
        setLoading(true);
        setErrorMsg("");
        try {
            const res = await fetch("/api/otp/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone: inputValue, otp: otpValue })
            });
            const data = await res.json();
            if (data.success || data.message === "Login Success") {
                localStorage.setItem("isLoggedIn", "true");
                alert("Login successful!");
                window.location.href = "/";
            } else {
                setErrorMsg(data.message || "Invalid OTP");
            }
        } catch (error) {
            setErrorMsg("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleEmailLogin = async () => {
        if (!inputValue || !passwordValue) return;
        setLoading(true);
        setErrorMsg("");
        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: inputValue, password: passwordValue })
            });
            const data = await res.json();
            if (data.message === "Login Success") {
                localStorage.setItem("isLoggedIn", "true");
                alert("Login successful!");
                window.location.href = "/";
            } else {
                setErrorMsg(data.message || "Invalid Email or Password");
            }
        } catch (error) {
            setErrorMsg("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-[80vh] items-center justify-center px-6 py-12">
            <div className="w-full max-w-4xl bg-white rounded-3xl premium-shadow overflow-hidden flex flex-col md:flex-row border border-zinc-100">
                {/* Left Side: Image/Branding */}
                <div className="md:w-1/2 relative min-h-[300px] md:min-h-full bg-zinc-950 flex flex-col items-center justify-center text-white p-12 overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent opacity-20 blur-[100px]"></div>
                    <div className="relative z-10 text-center space-y-6">
                        <h2 className="text-4xl font-black tracking-tighter uppercase">Join the <br /> Elite Circle</h2>
                        <p className="text-zinc-400 text-sm font-medium leading-relaxed font-serif italic">
                            "Style is a way to say who you are <br /> without having to speak."
                        </p>
                    </div>
                    <div className="absolute bottom-10 left-10 opacity-20">
                        <span className="text-6xl font-black tracking-tighter">TRND.</span>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="md:w-1/2 p-8 md:p-16 space-y-10 bg-white">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-black tracking-tighter uppercase">Welcome Back</h1>
                        <p className="text-zinc-500 text-sm font-medium">Log in to access your curated collections.</p>
                    </div>

                    {errorMsg && (
                        <div className="p-3 bg-red-100 text-red-600 rounded-xl text-sm font-semibold">
                            {errorMsg}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Email or Phone Number</label>
                            <input
                                type="text"
                                placeholder="name@example.com or +1234567890"
                                value={inputValue}
                                onChange={(e) => {
                                    setInputValue(e.target.value);
                                    setOtpSent(false); // Reset OTP state if input changes
                                    setErrorMsg("");
                                }}
                                className="w-full px-6 py-4 bg-zinc-50 rounded-2xl outline-none focus:ring-1 focus:ring-black/10 transition-all font-bold"
                            />
                        </div>

                        {/* Dynamic Rendering Based on Input Type */}
                        {isEmail && (
                            <>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center px-1">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Password</label>
                                        <Link href="#" className="text-[10px] font-black uppercase tracking-widest text-accent hover:underline">Forgot?</Link>
                                    </div>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        value={passwordValue}
                                        onChange={(e) => setPasswordValue(e.target.value)}
                                        className="w-full px-6 py-4 bg-zinc-50 rounded-2xl outline-none focus:ring-1 focus:ring-black/10 transition-all font-bold"
                                    />
                                </div>
                                <button
                                    onClick={handleEmailLogin}
                                    disabled={loading}
                                    className="w-full bg-black text-white py-5 rounded-2xl font-black text-xs tracking-[0.3em] uppercase hover:bg-accent transition-all shadow-lg active:scale-[0.98] mt-4 disabled:opacity-50">
                                    {loading ? "Signing In..." : "Sign In"}
                                </button>
                            </>
                        )}

                        {isPhone && (
                            <div className="space-y-4 pt-2">
                                {otpSent ? (
                                    <>
                                        <div className="space-y-2 pt-2">
                                            <div className="flex justify-between items-center px-1">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Enter OTP</label>
                                                <button type="button" onClick={handleSendOTP} disabled={loading} className="text-[10px] font-black uppercase tracking-widest text-accent hover:underline">Resend OTP</button>
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="6-digit OTP"
                                                maxLength={6}
                                                value={otpValue}
                                                onChange={(e) => setOtpValue(e.target.value)}
                                                className="w-full px-6 py-4 bg-zinc-50 rounded-2xl outline-none focus:ring-1 focus:ring-black/10 transition-all font-bold text-center tracking-widest text-xl tracking-[1em]"
                                            />
                                        </div>
                                        <button
                                            onClick={handleVerifyOTP}
                                            disabled={loading}
                                            className="w-full bg-black text-white py-5 rounded-2xl font-black text-xs tracking-[0.3em] uppercase hover:bg-accent transition-all shadow-lg active:scale-[0.98] disabled:opacity-50">
                                            {loading ? "Verifying..." : "Verify & Sign In"}
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={handleSendOTP}
                                        disabled={loading}
                                        className="w-full bg-black text-white py-5 rounded-2xl font-black text-xs tracking-[0.3em] uppercase hover:bg-accent transition-all shadow-lg active:scale-[0.98] mt-4 disabled:opacity-50"
                                    >
                                        {loading ? "Sending..." : "Get OTP"}
                                    </button>
                                )}
                            </div>
                        )}
                        {!isEmail && !isPhone && (
                            <button disabled className="w-full bg-zinc-200 text-zinc-400 py-5 rounded-2xl font-black text-xs tracking-[0.3em] uppercase cursor-not-allowed mt-4">
                                Enter Details
                            </button>
                        )}
                    </form>

                    <div className="pt-6 text-center">
                        <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest">
                            New to Trendora?{" "}
                            <Link href="/register" className="text-black hover:text-accent transition-colors underline underline-offset-4 font-black">
                                Create Account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
