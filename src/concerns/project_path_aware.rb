require 'pathname'

module Rougemine
    module ProjectPathAware
        private

        def project_path
            @project_path ||= Pathname(__dir__).join("../", "../")
        end

        def src_path
            @src_path ||= File.expand_path("src", project_path)
        end

        def build_path
            @build_path ||= File.expand_path("build", project_path)
        end

        def data_path
            @data_path ||= File.expand_path("data", project_path)
        end

        def assets_path
            @assets_path ||= File.expand_path(File.join("src", "assets"), project_path)
        end
    end
end
