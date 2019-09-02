require 'erb'
require 'pathname'

require 'concerns/project_path_aware'
require 'data_provider'

module Rougemine
    class HtmlBuilder
        include ProjectPathAware
        
        def build(target_dir: nil)
            data_provider = DataProvider.new
            puts data_provider.skills
            rhtml = ERB.new(template)
            html_result = rhtml.result(data_provider.get_binding)
            create_html_file html: html_result, target_dir: target_dir
        end
        
        private

        def create_html_file(html:, target_dir: nil)
            target_dir = build_path if target_dir.nil?
            File.open("#{target_dir}/index.html", "w") do |file|
                file.puts html
            end
        end

        def template
            template_path = Pathname(__dir__).join("../", "html", "cv.html.erb")
            File.read(template_path)
        end
    end
end
