require 'sassc'

require 'concerns/project_path_aware'

module Rougemine
    class CssBuilder
        include ProjectPathAware
        
        def build(target_dir: nil)
            create_css_file target_dir: target_dir
        end
        
        private

        def create_css_file(target_dir: nil)
            target_dir = build_path if target_dir.nil?
            
            css = SassC::Engine.new(scss_main, style: :compressed, source_map_embed: true, load_paths: [scss_path]).render
            File.open(File.join(target_dir, "main.css"), "w") do |file|
                file.puts css
            end
        end

        def scss_main
            scss_main_path = File.join(scss_path, "main.scss")
            File.read(scss_main_path)
        end
    end
end
