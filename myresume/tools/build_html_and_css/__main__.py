import multiprocessing
import subprocess

COMMANDS = (
    "python -m myresume.tools.generate_html",
    "tailwindcss -i ./myresume/assets/css/main.css -o ./dist/assets/main.css",
)

build_processes: list[multiprocessing.Process] = []
for command in COMMANDS:
    build_process = multiprocessing.Process(
        target=subprocess.run, args=[command], kwargs={"shell": True}, daemon=False
    )
    build_processes.append(build_process)

for process in build_processes:
    process.start()
for process in build_processes:
    try:
        process.join()
    except KeyboardInterrupt:
        process.kill()
