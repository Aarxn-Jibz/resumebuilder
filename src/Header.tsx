import type { Component } from 'solid-js';
import { A } from '@solidjs/router';

const Header: Component = () => {
    return (
        <header class="sticky top-0 z-50 bg-main-bg border-b border-gray-100">
            <div class="h-16 items-center flex justify-between px-6">
                <A href="/" class="font-heading text-main-text text-xl">
                    ResumeBuilder
                </A>
                <A 
                    href="/create" 
                    class="flex items-center gap-1.5 bg-main-text text-main-bg px-4 py-2 rounded-full font-body font-bold transition-all hover:opacity-90 active:scale-95"
                >
                    <span class="text-sm">Create</span>
                </A>
            </div>
        </header>
    )
}

export default Header;