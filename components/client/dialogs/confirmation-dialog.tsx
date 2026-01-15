"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/client/ui/dialog";
import { Button } from "@/components/client/ui/button";

interface ConfirmationDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onConfirm: () => void;
	title?: string;
	description?: string;
	confirmText?: string;
	cancelText?: string;
	isDestructive?: boolean;
}

export function ConfirmationDialog({ 
	open, 
	onOpenChange, 
	onConfirm,
	title = "Are you sure?", 
	description = "This action cannot be undone.", 
	confirmText = "Confirm",
	cancelText = "Cancel",
	isDestructive = true
}: ConfirmationDialogProps) {
	const handleConfirm = () => {
		onConfirm();
		onOpenChange(false);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent
				className="max-w-sm bg-white/90 dark:bg-surface-dark/90 border-0 shadow-[0_8px_30px_rgba(239,68,68,0.10)] rounded-2xl p-0 backdrop-blur-xl ring-1 ring-red-500/10"
			>
				<DialogHeader className="flex flex-col items-center pt-10 pb-2 px-8">
					<div className="flex items-center justify-center mb-5">
						{/* Animated Warning SVG */}
						<svg className="ft-warning" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="96" height="96">
							<style>{`
								@keyframes grow-warning {
									60% {
										transform: scale(.8);
										stroke-width: 4px;
										fill-opacity: 0;
									}
									100% {
										transform: scale(.9);
										stroke-width: 8px;
										fill-opacity: 1;
										fill: ${isDestructive ? '#EF4444' : 'var(--color-primary, #13C1AC)'};
									}
								}
								@keyframes draw-warning {
									0% { stroke-opacity: 1; stroke-dashoffset: 30px; }
									100% { stroke-opacity: 1; stroke-dashoffset: 0; }
								}
								.circle-warning {
									fill: ${isDestructive ? '#EF4444' : 'var(--color-primary, #13C1AC)'};
									fill-opacity: 0;
									stroke: ${isDestructive ? '#EF4444' : 'var(--color-primary, #13C1AC)'};
									stroke-width: 16px;
									transform-origin: center;
									transform: scale(0);
									animation: grow-warning 1s cubic-bezier(.25, .25, .25, 1.25) forwards;
								}
								.warning-icon {
									fill: none;
									stroke: #FFF;
									stroke-width: 6;
									stroke-linecap: round;
									stroke-linejoin: round;
									stroke-miterlimit: 10;
									stroke-opacity: 0;
									stroke-dasharray: 30px;
									stroke-dashoffset: 30px;
									animation: draw-warning .5s cubic-bezier(.25, .25, .25, 1) forwards;
									animation-delay: .6s;
								}
							`}</style>
							<circle className="circle-warning" cx="24" cy="24" r="22" />
							<path className="warning-icon" d="M24 14v12M24 30v2" />
						</svg>
					</div>
					<DialogTitle className={`text-2xl font-extrabold ${isDestructive ? 'text-red-500' : 'text-primary'} dark:${isDestructive ? 'text-red-500' : 'text-primary'} mb-2 text-center drop-shadow-sm`}>
						{title}
					</DialogTitle>
					<DialogDescription className="text-lg text-text-secondary dark:text-gray-400 text-center mb-1">
						{description}
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className="flex flex-row gap-3 px-8 pb-10 pt-2">
					<Button
						onClick={() => onOpenChange(false)}
						className="flex-1 h-12 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-bold rounded-xl shadow-lg transition-all text-base tracking-wide"
					>
						{cancelText}
					</Button>
					<Button
						onClick={handleConfirm}
						className={`flex-1 h-12 ${isDestructive ? 'bg-red-500 hover:bg-red-600 shadow-red-500/20' : 'bg-primary hover:bg-primary-hover shadow-primary/20'} text-white font-bold rounded-xl shadow-lg transition-all text-base tracking-wide`}
					>
						{confirmText}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
