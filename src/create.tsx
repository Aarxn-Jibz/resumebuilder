import type { Component } from 'solid-js';

const Create: Component = () => {
    return (
        <main class="min-h-screen pt-16 flex flex-col bg-main-bg text-main-text items-center justify-start p-6">
            <div class="h-[calc(100vh-4rem)] flex">
                <div class="w-1/2 border-r border-gray-700 p-6">
                    Left side
                </div>

                <div class="w-1/2 p-6">
                    Right side
                </div>
            </div>
        </main>
    )
}

export default Create;