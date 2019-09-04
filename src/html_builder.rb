require 'concerns/project_path_aware'
require 'views/cv_view'

module Rougemine
    class HtmlBuilder
        include ProjectPathAware
        
        def build(target_dir: nil)
            cv_html = CvView.new.get_html
            create_html_file html: cv_html, target_dir: target_dir
        end
        
        private

        def create_html_file(html:, target_dir: nil)
            target_dir = build_path if target_dir.nil?
            File.open(File.join(target_dir, "index.html"), "w") do |file|
                file.puts html
            end
        end
    end
end
