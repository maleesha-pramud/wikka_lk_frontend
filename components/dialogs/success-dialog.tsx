
"use client";


import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import * as React from "react";

interface SuccessDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	title?: string;
	description?: string;
	buttonText?: string;
}

export function SuccessDialog({ open, onOpenChange, title = "Success!", description = "You have successfully logged in.", buttonText = "Continue" }: SuccessDialogProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent
				className="max-w-sm bg-white/90 dark:bg-surface-dark/90 border-0 shadow-[0_8px_30px_rgba(19,193,172,0.10)] rounded-2xl p-0 backdrop-blur-xl ring-1 ring-primary/10"
			>
				<DialogHeader className="flex flex-col items-center pt-10 pb-2 px-8">
					<div className="flex items-center justify-center mb-5">
						{/* Animated Success SVG */}
						<svg className="ft-green-tick" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="96" height="96">
							<style>{`
								@keyframes grow {
									60% {
										transform: scale(.8);
										stroke-width: 4px;
										fill-opacity: 0;
									}
									100% {
										transform: scale(.9);
										stroke-width: 8px;
										fill-opacity: 1;
										fill: var(--color-primary, #13C1AC);
									}
								}
								@keyframes draw {
									0% { stroke-opacity: 1; stroke-dashoffset: 30px; }
									100% { stroke-opacity: 1; stroke-dashoffset: 0; }
								}
								.circle {
									fill: var(--color-primary, #13C1AC);
									fill-opacity: 0;
									stroke: var(--color-primary, #13C1AC);
									stroke-width: 16px;
									transform-origin: center;
									transform: scale(0);
									animation: grow 1s cubic-bezier(.25, .25, .25, 1.25) forwards;
								}
								.tick {
									fill: none;
									stroke: #FFF;
									stroke-width: 6;
									stroke-linecap: round;
									stroke-linejoin: round;
									stroke-miterlimit: 10;
									stroke-opacity: 0;
									stroke-dasharray: 30px;
									stroke-dashoffset: 30px;
									animation: draw .5s cubic-bezier(.25, .25, .25, 1) forwards;
									animation-delay: .6s;
								}
							`}</style>
							<circle className="circle" cx="24" cy="24" r="22" />
							<path className="tick" d="M14 27l5.917 4.917L34 17" />
						</svg>
					</div>
					<DialogTitle className="text-2xl font-extrabold text-primary dark:text-primary mb-2 text-center drop-shadow-sm">
						{title}
					</DialogTitle>
					<DialogDescription className="text-lg text-text-secondary dark:text-gray-400 text-center mb-1">
						{description}
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className="flex flex-col gap-4 px-8 pb-10 pt-2">
					<Button
						onClick={() => onOpenChange(false)}
						className="w-full h-12 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all text-base tracking-wide"
					>
						{buttonText}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
