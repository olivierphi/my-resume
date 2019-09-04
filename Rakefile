task default: %i[build]

task build: [:bootstrap] do
  require 'html_builder'
  require 'css_builder'
  require 'assets_manager'
  Rougemine::HtmlBuilder.new.build()
  Rougemine::CssBuilder.new.build()
  Rougemine::AssetsManager.new.copy_assets()
end

first_bootstrap_done = false

task :bootstrap do
  require_relative 'src/bootstrap'
  reload! if first_bootstrap_done
  Rougemine::Bootstrap.boot()
  first_bootstrap_done = true
end

# @link https://cobwwweb.com/add-reload-method-to-ruby-console
def reload!(print: true)
  puts 'Reloading code in "src/"...' if print
  # Main project directory.
  root_dir = __dir__
  # Directories within the project that should be reloaded.
  reload_dirs = %w{src}
  # Loop through and reload every file in all relevant project directories.
  reload_dirs.each do |dir|
    Dir.glob("#{root_dir}/#{dir}/**/*.rb").each { |f| load(f) }
  end
  # Return true when complete.
  true
end
