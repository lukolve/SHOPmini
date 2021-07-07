#!/usr/bin/gjs

imports.gi.versions.Gtk = '3.0';
imports.gi.versions.WebKit2 = '4.0';

const Gio = imports.gi.Gio;
const GLib = imports.gi.GLib;
const Gtk = imports.gi.Gtk;
const Webkit = imports.gi.WebKit2;

class SHOP_app {

    // Create the application itself
  constructor() {
        this.application = new Gtk.Application ({
            application_id: 'org.example.myapp',
            flags: Gio.ApplicationFlags.FLAGS_NONE
        });

        // Connect 'activate' and 'startup' signals to the callback functions
        this.application.connect('activate', this._onActivate.bind(this));
        this.application.connect('startup', this._onStartup.bind(this));
    }

    // Callback function for 'activate' signal presents windows when active
    _onActivate() {
        this._window.present();
    }

    // Build the application's UI
    _buildUI() {

        // Create the application window
        this._window = new Gtk.ApplicationWindow  ({
            application: this.application,
            title: "Welcome to SHOP",
            default_height: 800,
            default_width: 800,
            window_position: Gtk.WindowPosition.CENTER });

        // Create a webview to show the web app
        this._webView = new Webkit.WebView ();

        // Put the web app into the webview
        this._webView.load_uri (GLib.filename_to_uri (GLib.get_current_dir() +
            "/objednaj.html", null));

        // Put the webview into the window
        this._window.add (this._webView);

        // Show the window and all child widgets
        this._window.show_all();
    }

    _showNew() {
    	// Create the application window
        this._window = new Gtk.ApplicationWindow  ({
            application: this.application,
            title: "Welcome to SHOP",
            default_height: 800,
            default_width: 800,
            window_position: Gtk.WindowPosition.CENTER });
         // Create a webview to show the web app
        this._webView = new Webkit.WebView ();

        // Put the web app into the webview
        this._webView.load_uri (GLib.filename_to_uri (GLib.get_current_dir() +
            "/objednaj.html", null));

        // Put the webview into the window
        this._window.add (this._webView);

        // Show the window and all child widgets
        this._window.show_all();
    }

    _showAbout() {
    	// Create the application window
        this._window = new Gtk.ApplicationWindow  ({
            application: this.application,
            title: "Welcome to SHOP",
            default_height: 800,
            default_width: 800,
            window_position: Gtk.WindowPosition.CENTER });
         // Create a webview to show the web app
        this._webView = new Webkit.WebView ();

        // Put the web app into the webview
        this._webView.load_uri (GLib.filename_to_uri (GLib.get_current_dir() +
            "/kontakt.html", null));

        // Put the webview into the window
        this._window.add (this._webView);

        // Show the window and all child widgets
        this._window.show_all();
    }

    //create the menu items and connect the signals to the callback functions.
    _initMenus() {
        let menu = new Gio.Menu();
        menu.append("Objednaj",'app.new');
        menu.append("Kontakt", 'app.about');
        menu.append("Quit",'app.quit');
        this.application.set_app_menu(menu);

        let newAction = new Gio.SimpleAction ({ name: 'new' });
        newAction.connect('activate', () => { this._showNew(); });
        this.application.add_action(newAction);

        let aboutAction = new Gio.SimpleAction ({ name: 'about' });
        aboutAction.connect('activate', () => { this._showAbout(); });
        this.application.add_action(aboutAction);

        let quitAction = new Gio.SimpleAction ({ name: 'quit' });
        quitAction.connect('activate', () => { this._window.destroy(); });
        this.application.add_action(quitAction);
    }

    // Callback function for 'startup' signal builds the UI
    _onStartup() {
       //You must call _initMenus() before calling _buildUI().
        this._initMenus();
        this._buildUI();
    }

};

// Run the application
let app = new SHOP_app ();
app.application.run (ARGV);
