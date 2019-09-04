require 'pathname'

module Rougemine
    module ProjectPathAware
        private

        def project_path
            @project_path ||= Pathname(__dir__).join("../", "../")
        end

        def src_path
            @src_path ||= project_folder "src"
        end

        def build_path
            @build_path ||= project_folder "build"
        end

        def data_path
            @data_path ||= project_folder "data"
        end

        def assets_path
            @assets_path ||= project_folder File.join("src", "assets")
        end

        def html_path
            @html_path ||= project_folder File.join("src", "html")
        end

        def scss_path
            @scss_path ||= project_folder File.join("src", "scss")
        end

        def views_path
            @views_path ||= project_folder File.join("src", "views")
        end

        def project_folder(folder_path)
            File.expand_path(folder_path, project_path)
        end
    end
end
