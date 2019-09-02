task default: %i[build]

task build: [:bootstrap] do
  require 'html_builder'
  require 'assets_manager'
  Rougemine::HtmlBuilder.new.build()
  Rougemine::AssetsManager.new.copy_assets()
  
end

task :bootstrap do
  require_relative 'src/bootstrap'
  Rougemine::Bootstrap.boot()
end
