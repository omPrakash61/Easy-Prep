"use client";
import React, { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Zap,
  Users,
  BarChart2,
  Cpu,
  Rocket,
  Menu,
  Sparkles,
  Youtube,
  YoutubeIcon,
  Brain,
  Laugh,
  FileQuestion,
  BookOpen,
  Award,
  User,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@clerk/nextjs";

export default function LandingPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, isSignedIn } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-purple-50 to-gray-50 text-slate-900">
      <header className="sticky top-0 z-50 bg-white/60 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center h-16">
            <div className="absolute left-0 inset-y-0 flex items-center sm:static sm:inset-auto">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white shadow-md">
                  <Rocket className="w-5 h-5" />
                </div>
                <span className="hidden sm:inline-block font-sans font-bold text-xl">
                  Easy-Prep
                </span>
              </Link>
            </div>

            <nav className="mx-auto hidden md:flex items-center gap-5">
              <Link
                href="#Features"
                className="text-sm font-medium py-2 px-3 hover:border-1 hover:border-purple-400 rounded-lg  hover:text-purple-600 transition"
              >
                Features
              </Link>
              <Link
                href="#howitworks"
                className="text-sm font-medium hover:text-purple-600 transition py-2 px-3 hover:border-1 hover:border-purple-400 rounded-lg"
              >
                How it works
              </Link>
              <Link
                href="#pricing"
                className="text-sm font-medium hover:text-purple-600 transition py-2 px-3 hover:border-1 hover:border-purple-400 rounded-lg"
              >
                Pricing
              </Link>
              <Link
                href="#testimonials"
                className="text-sm font-medium hover:text-purple-600 transition py-2 px-3 hover:border-1 hover:border-purple-400 rounded-lg"
              >
                Testimonials
              </Link>
            </nav>

            <div className="absolute right-0 inset-y-0 flex items-center gap-3">
              <Link href="#pricing" className="hidden sm:inline-block">
                <Button variant="ghost" className="text-sm">
                  Pricing
                </Button>
              </Link>

              {isSignedIn ? (
                <div className="flex items-center gap-4">
                  <UserButton />
                </div>
              ) : (
                <div><Link href='/sign-in'><Button className="text-sm">Sign in</Button></Link></div>
              )}

              <button
                className="md:hidden p-2 rounded-md text-slate-700 hover:bg-slate-100"
                onClick={() => setMobileOpen((s) => !s)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-4 space-y-2">
              <Link
                href="#Features"
                className="block px-3 py-2 rounded-md hover:bg-purple-50"
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="block px-3 py-2 rounded-md hover:bg-purple-50"
              >
                How it works
              </Link>
              <Link
                href="#pricing"
                className="block px-3 py-2 rounded-md hover:bg-purple-50"
              >
                Pricing
              </Link>
              <Link
                href="/sign-in"
                className="block px-3 py-2 rounded-md bg-purple-600 text-white text-center"
              >
                Sign in
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* hero left */}
            <div className="lg:col-span-7">
              <Badge className="mb-4 bg-purple-100 text-purple-700">
                AI powered • Personalized learning
              </Badge>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-extrabold tracking-tight leading-tight">
                Create & Learn Courses with{" "}
                <span className="bg-clip-text font-sans text-transparent bg-gradient-to-r from-purple-600 to-pink-500">
                  Gen‑AI
                </span>
              </h1>

              <p className="mt-6 text-lg text-slate-700 max-w-2xl">
                Easy-Prep helps creators build rich, interactive courses in
                minutes with AI-generated content, and helps learners stay on
                track with smart progress tracking and personalized
                recommendations.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/workspace">
                  <Button className="px-6 py-3 shadow-lg">Get started</Button>
                </Link>

                <Link href="#pricing">
                  <Button variant="outline" className="px-6 py-3">
                    Explore pricing
                  </Button>
                </Link>

                <a
                  href="#howitworks"
                  className="flex items-center gap-2 text-sm text-slate-600 hover:text-purple-600 transition mt-2 sm:mt-0"
                >
                  <Zap className="w-4 h-4" /> See how it works
                </a>
              </div>

              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-md">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-50 rounded-md">
                    <Cpu className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">
                      AI Course Creation
                    </div>
                    <div className="text-xs text-slate-500">
                      Generate outlines, content & quizzes
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-50 rounded-md">
                    <BarChart2 className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">
                      Progress Tracking
                    </div>
                    <div className="text-xs text-slate-500">
                      Personalized learning paths
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-50 rounded-md">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Community</div>
                    <div className="text-xs text-slate-500">
                      Share, discuss & collaborate
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* hero right - visual card */}
            <div className="lg:col-span-5">
              <Card className="shadow-2xl ring-1 ring-black/5">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold">
                        Your learning snapshot
                      </div>
                      <div className="text-xs text-slate-500">
                        Personalized progress & recommendations
                      </div>
                    </div>
                    <Badge className="bg-purple-50 text-purple-700">Beta</Badge>
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-slate-500">
                          Course progress
                        </div>
                        <div className="text-lg font-semibold">
                          React + AI Course
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-slate-500">45%</div>
                        <div className="w-36">
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden mt-2">
                            <div
                              className="h-2 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full"
                              style={{ width: "45%" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="text-xs text-slate-500">
                          Next lesson
                        </div>
                        <div className="text-sm font-medium">
                          Generative prompts
                        </div>
                      </div>

                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="text-xs text-slate-500">
                          Recommended
                        </div>
                        <div className="text-sm font-medium">Quiz: 5 min</div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Link href="/workspace">
                        <Button className="w-full">Open dashboard</Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold">
              Everything you need to create & learn
            </h2>
            <p className="mt-3 text-slate-600">
              From AI-generated lessons to progress insights — all in one place.
            </p>
          </div>

          <div className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 bg-white rounded-2xl shadow-sm border">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-50 rounded-lg">
                  <Cpu className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold">Gen-AI Content</div>
                  <div className="text-sm text-slate-500">
                    Auto-generate outlines, content, and quizzes.
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow-sm border">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-50 rounded-lg">
                  <BarChart2 className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold">Progress Intelligence</div>
                  <div className="text-sm text-slate-500">
                    Track progress and get personalized recommendations.
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow-sm border">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-50 rounded-lg">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold">Collaborative Learning</div>
                  <div className="text-sm text-slate-500">
                    Community features to share & iterate on courses.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="Features"
        className="relative py-20 md:py-24 px-6 sm:px-12 lg:px-20 bg-gradient-to-b from-white to-purple-50 overflow-hidden"
      >
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-gray-100">
              Unlock a New Way to Learn
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
              Our platform is built on cutting-edge Gen-AI to give you a truly
              personalized and effective learning experience.
            </p>
          </div>
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature: AI Course Creation */}
            <Card className="p-8 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-850 relative overflow-hidden">
              {/* Shady background for the card */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5  opacity-100"></div>
              <CardHeader className="relative z-10 flex flex-col items-start space-y-4">
                <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
                  <Sparkles className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  AI Course Creation
                </CardTitle>
                <CardDescription className="text-base text-gray-600 dark:text-gray-400">
                  Just provide a topic, and our AI instantly generates a
                  complete, structured course. It creates an outline, fills in
                  topics, and suggests resources so you can focus on learning,
                  not building.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature: Free Top Searches & YT Videos */}
            <Card className="p-8 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-850 relative overflow-hidden">
              {/* Shady background for the card */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5 dark:to-white/5 opacity-100"></div>
              <CardHeader className="relative z-10 flex flex-col items-start space-y-4">
                <div className="p-3 rounded-full bg-pink-100 dark:bg-pink-900">
                  <Youtube className="w-8 h-8 text-pink-600 dark:text-pink-400" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  Curated Video Library
                </CardTitle>
                <CardDescription className="text-base text-gray-600 dark:text-gray-400">
                  Say goodbye to endless searching. Our AI scours YouTube and
                  other platforms to find and recommend the highest-quality
                  videos relevant to your course material, saving you time and
                  effort.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature: Progress Tracking */}
            <Card className="p-8 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-850 relative overflow-hidden">
              {/* Shady background for the card */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5 dark:to-white/5 opacity-100"></div>
              <CardHeader className="relative z-10 flex flex-col items-start space-y-4">
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                  <BarChart2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  Intelligent Progress Tracking
                </CardTitle>
                <CardDescription className="text-base text-gray-600 dark:text-gray-400">
                  Monitor your growth with a visual dashboard. Track your
                  completion rate, identify areas for improvement, and see your
                  learning streaks to stay motivated and on target.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature: Personalized Learning Paths */}
            <Card className="p-8 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-850 relative overflow-hidden">
              {/* Shady background for the card */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5 dark:to-white/5 opacity-100"></div>
              <CardHeader className="relative z-10 flex flex-col items-start space-y-4">
                <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
                  <Brain className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  Personalized Learning Paths
                </CardTitle>
                <CardDescription className="text-base text-gray-600 dark:text-gray-400">
                  Our AI adapts to you. Get smart recommendations for topics,
                  quizzes, and exercises based on your strengths and weaknesses,
                  ensuring a truly tailored learning journey.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature: Learning with Fun */}
            <Card className="p-8 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-850 relative overflow-hidden">
              {/* Shady background for the card */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5 dark:to-white/5 opacity-100"></div>
              <CardHeader className="relative z-10 flex flex-col items-start space-y-4">
                <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900">
                  <Laugh className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  Learn with Fun
                </CardTitle>
                <CardDescription className="text-base text-gray-600 dark:text-gray-400">
                  Break away from boring textbooks. Our platform integrates
                  interactive quizzes, gamified elements, and engaging content
                  formats to make every lesson an enjoyable experience.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature: Interactive Quizzes & Assessments */}
            <Card className="p-8 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-850 relative overflow-hidden">
              {/* Shady background for the card */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5 dark:to-white/5 opacity-100"></div>
              <CardHeader className="relative z-10 flex flex-col items-start space-y-4">
                <div className="p-3 rounded-full bg-red-100 dark:bg-red-900">
                  <FileQuestion className="w-8 h-8 text-red-600 dark:text-red-400" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  Interactive Quizzes & Assessments
                </CardTitle>
                <CardDescription className="text-base text-gray-600 dark:text-gray-400">
                  Reinforce your knowledge with AI-generated quizzes. The
                  questions adapt to your performance, providing a challenge
                  that's always just right for you.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section
        id="pricing"
        className="py-24 bg-gradient-to-b from-purple-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold">Choose a plan that fits</h2>
          <p className="mt-2 text-slate-600">
            Simple pricing — scale as you grow.
          </p>

          <div className="mt-8 grid gap-6 grid-cols-1 md:grid-cols-3">
            <div className="p-14 rounded-2xl border bg-white shadow-sm">
              <div className="text-lg font-semibold">Starter</div>
              <div className="mt-2 text-3xl font-bold">Free</div>
              <div className="mt-4 text-sm text-slate-500">
                Create and learn with basic AI features.
              </div>
              <div className="mt-6">
                <Button variant="outline" className="w-full">
                  Get started (Free)
                </Button>
              </div>
            </div>

            <div className="p-14 rounded-2xl border bg-white shadow-lg transform scale-100 md:scale-105">
              <div className="text-lg font-semibold">Pro</div>
              <div className="mt-2 text-3xl font-bold">$12/mo</div>
              <div className="mt-4 text-sm text-slate-500">
                ✅ Advanced Gen-AI and progress analytics.
              </div>
              <div className="mt-2 text-sm text-slate-500">
                ✅ Generate Upto 50 Course/Month.
              </div>
              <div className="mt-2 text-sm text-slate-500">
                ✅ Personalized Learning experience.
              </div>
              <div className="mt-6">
                <Button className="w-full">Upgrade to Pro</Button>
              </div>
            </div>

            <div className="p-14 rounded-2xl border bg-white shadow-sm">
              <div className="text-lg font-semibold">Enterprise</div>
              <div className="mt-2 text-3xl font-bold">Contact</div>
              <div className="mt-4 text-sm text-slate-500">
                SAML, teams, and priority support.
              </div>
              <div className="mt-6">
                <Button variant="ghost" className="w-full">
                  Contact us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="howitworks"
        className="py-20 md:py-24 px-6 sm:px-12 bg-white dark:bg-gray-900"
      >
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            Your Learning Journey in 3 Simple Steps
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-16">
            Discover how our platform simplifies the entire learning process,
            from creation to mastery.
          </p>

          <div className="grid gap-12 lg:grid-cols-3 items-center">
            {/* Step 1: Create */}
            <div className="flex flex-col items-center">
              <div className="p-4 rounded-full bg-purple-100 dark:bg-purple-900 mb-6">
                <Zap className="w-10 h-10 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
                1. Create Instantly
              </h3>
              <p className="text-base text-gray-600 dark:text-gray-400 max-w-xs">
                Enter a topic and let our powerful AI instantly generate a
                comprehensive, ready-to-learn course just for you.
              </p>
            </div>

            {/* Step 2: Learn */}
            <div className="flex flex-col items-center">
              <div className="p-4 rounded-full bg-pink-100 dark:bg-pink-900 mb-6">
                <BookOpen className="w-10 h-10 text-pink-600 dark:text-pink-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
                2. Learn Smarter
              </h3>
              <p className="text-base text-gray-600 dark:text-gray-400 max-w-xs">
                Engage with AI-curated content, interactive quizzes, and
                top-tier YouTube videos to accelerate your understanding.
              </p>
            </div>

            {/* Step 3: Master */}
            <div className="flex flex-col items-center">
              <div className="p-4 rounded-full bg-blue-100 dark:bg-blue-900 mb-6">
                <Award className="w-10 h-10 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
                3. Track & Master
              </h3>
              <p className="text-base text-gray-600 dark:text-gray-400 max-w-xs">
                Follow your progress with a dynamic dashboard and personalized
                insights, helping you stay on track and master your goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials or Social Proof Section */}
      <section id='testimonials' className="py-20 md:py-24 px-6 sm:px-12 bg-gradient-to-b from-white to-purple-50">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            What Our Users Say
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12">
            Hear from people who are already transforming their learning journey
            with our AI-powered platform.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <Card className="p-6 shadow-xl rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 relative overflow-hidden">
              {/* Shady background for the card */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5 dark:to-white/5 opacity-100"></div>
              <div className="relative z-10 flex items-center mb-4">
                <User className="m-3 p-3 w-12 h-12 bg-gray-100 rounded-sm" />

                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    Alex R.
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Student
                  </p>
                </div>
              </div>
              <p className="relative z-10 italic text-gray-700 dark:text-gray-300">
                "The AI-generated courses are a game-changer. I went from
                knowing nothing to building a full course in minutes. This
                platform is incredibly intuitive and powerful."
              </p>
            </Card>

            {/* Testimonial 2 */}
            <Card className="p-6 shadow-xl rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 relative overflow-hidden">
              {/* Shady background for the card */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5 dark:to-white/5 opacity-100"></div>
              <div className="relative z-10 flex items-center mb-4">
                <User className="p-3 m-3 w-12 h-12 bg-gray-100 rounded-sm" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    Maria S.
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Developer
                  </p>
                </div>
              </div>
              <p className="relative z-10 italic text-gray-700 dark:text-gray-300">
                "I love the progress tracking. Seeing my progress visualized
                keeps me motivated. The curated YouTube videos save me so much
                time!"
              </p>
            </Card>

            {/* Testimonial 3 */}
            <Card className="p-6 shadow-xl rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 relative overflow-hidden">
              {/* Shady background for the card */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5 dark:to-white/5 opacity-100"></div>
              <div className="relative z-10 flex items-center mb-4">
                <User className="my-3 p-3 mx-3 w-12 h-12 bg-gray-100 rounded-sm" />

                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    Ben L.
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Hobbyist
                  </p>
                </div>
              </div>
              <p className="relative z-10 italic text-gray-700 dark:text-gray-300">
                "Learning has always felt like a chore, but this platform makes
                it fun. The interactive elements and quizzes make every session
                engaging."
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white shadow-md">
              <Rocket className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold">Easy-Prep</div>
              <div className="text-sm text-slate-500">Learn better with AI</div>
            </div>
          </div>

          <div className="text-sm text-slate-500">
            © {new Date().getFullYear()} Easy-Prep. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
