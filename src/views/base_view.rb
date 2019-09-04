require 'erb'

require 'concerns/project_path_aware'
require 'data_bucket'

module Rougemine
    class BaseView
        include ProjectPathAware

        def initialize
            @html_template = nil # override this value in sub-classes :-)
        end
        
        def get_html
            rhtml = ERB.new(template)
            rhtml.result(get_binding)
            # "#{self.class} - #{@html_template}" + rhtml.result(get_binding)
        end

        def data
            DataBucket.instance
        end
        
        private

        def get_binding
            binding
        end

        def template
            template_path = File.join(html_path, "#{@html_template}.html.erb")
            File.read(template_path)
        end
    end
end
