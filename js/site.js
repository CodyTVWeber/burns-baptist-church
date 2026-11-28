(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  window.addEventListener("resize", function () {
    if (window.matchMedia("(min-width: 900px)").matches) {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
})();

(function () {
  var section = document.querySelector(".feeds-section");
  if (!section) return;

  var config = {
    youtubeApiKey: (section.getAttribute("data-youtube-api-key") || "").trim(),
    youtubeChannelId: (section.getAttribute("data-youtube-channel-id") || "").trim(),
    youtubePlaylistId: (section.getAttribute("data-youtube-uploads-playlist") || "").trim(),
    youtubeMax: 3,
    facebookAppId: (section.getAttribute("data-facebook-app-id") || "").trim(),
    facebookPageUrl: (section.getAttribute("data-facebook-page-url") || "").trim()
  };

  loadYoutubeFeed(config);
  loadFacebookPlugin(config);

  function uploadsPlaylistId() {
    if (config.youtubePlaylistId) return config.youtubePlaylistId;
    if (config.youtubeChannelId.indexOf("UC") === 0) {
      return "UU" + config.youtubeChannelId.slice(2);
    }
    return "";
  }

  function loadYoutubeFeed(settings) {
    var mount = document.getElementById("youtube-feed");
    if (!mount || !settings.youtubeApiKey) return;

    var playlistId = uploadsPlaylistId();
    var request = playlistId
      ? fetchPlaylist(settings.youtubeApiKey, playlistId)
      : fetchChannelPlaylist(settings);

    request
      .then(function (videoIds) {
        if (!videoIds || !videoIds.length) return null;
        return fetchVideos(settings.youtubeApiKey, videoIds);
      })
      .then(function (videos) {
        if (!videos || !videos.length) return;
        renderYoutubeGrid(mount, videos.slice(0, settings.youtubeMax));
      })
      .catch(function () {
        // Keep the compact playlist embed already in the page.
      });
  }

  function fetchChannelPlaylist(settings) {
    if (!settings.youtubeChannelId) return Promise.resolve([]);
    var url =
      "https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=" +
      encodeURIComponent(settings.youtubeChannelId) +
      "&key=" +
      encodeURIComponent(settings.youtubeApiKey);
    return fetch(url)
      .then(readJson)
      .then(function (body) {
        var item = body.items && body.items[0];
        var playlist =
          item &&
          item.contentDetails &&
          item.contentDetails.relatedPlaylists &&
          item.contentDetails.relatedPlaylists.uploads;
        if (!playlist) return [];
        return fetchPlaylist(settings.youtubeApiKey, playlist);
      });
  }

  function fetchPlaylist(apiKey, playlistId) {
    var url =
      "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=4&playlistId=" +
      encodeURIComponent(playlistId) +
      "&key=" +
      encodeURIComponent(apiKey);
    return fetch(url)
      .then(readJson)
      .then(function (body) {
        var ids = [];
        var seen = {};
        (body.items || []).forEach(function (item) {
          var id =
            (item.contentDetails && item.contentDetails.videoId) ||
            (item.snippet && item.snippet.resourceId && item.snippet.resourceId.videoId);
          if (id && !seen[id]) {
            seen[id] = true;
            ids.push(id);
          }
        });
        return ids;
      });
  }

  function fetchVideos(apiKey, videoIds) {
    var url =
      "https://www.googleapis.com/youtube/v3/videos?part=snippet,liveStreamingDetails&id=" +
      encodeURIComponent(videoIds.join(",")) +
      "&key=" +
      encodeURIComponent(apiKey);
    return fetch(url)
      .then(readJson)
      .then(function (body) {
        var byId = {};
        (body.items || []).forEach(function (item) {
          byId[item.id] = parseVideo(item);
        });
        var videos = [];
        videoIds.forEach(function (id) {
          if (byId[id]) videos.push(byId[id]);
        });
        videos.sort(function (a, b) {
          if (a.live && !b.live) return -1;
          if (!a.live && b.live) return 1;
          return 0;
        });
        return videos;
      });
  }

  function parseVideo(item) {
    var snippet = item.snippet || {};
    var thumbs = snippet.thumbnails || {};
    var thumb = thumbs.medium || thumbs.high || thumbs.default || {};
    return {
      id: item.id,
      title: snippet.title || "Church recording",
      thumbUrl: thumb.url || "https://i.ytimg.com/vi/" + item.id + "/mqdefault.jpg",
      live: snippet.liveBroadcastContent === "live",
      upcoming: snippet.liveBroadcastContent === "upcoming"
    };
  }

  function readJson(response) {
    return response.json().then(function (body) {
      if (!response.ok) throw new Error("YouTube request failed");
      return body;
    });
  }

  function renderYoutubeGrid(mount, videos) {
    var grid = document.createElement("div");
    grid.className = "yt-grid";
    videos.forEach(function (video) {
      grid.appendChild(videoCard(video));
    });
    mount.replaceChildren(grid);
  }

  function videoCard(video) {
    var card = document.createElement("a");
    card.className = "yt-card";
    card.href = "https://www.youtube.com/watch?v=" + encodeURIComponent(video.id);
    card.target = "_blank";
    card.rel = "noopener noreferrer";

    var media = document.createElement("div");
    media.className = "yt-media";

    if (video.live || video.upcoming) {
      var badge = document.createElement("span");
      badge.className = "yt-badge";
      badge.textContent = video.live ? "Live" : "Upcoming";
      media.appendChild(badge);
    }

    var img = document.createElement("img");
    img.src = video.thumbUrl;
    img.alt = "";
    img.loading = "lazy";
    img.width = 320;
    img.height = 180;
    media.appendChild(img);

    var play = document.createElement("span");
    play.className = "yt-play";
    play.setAttribute("aria-hidden", "true");
    play.innerHTML =
      '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M8.4 6.6v10.8L18 12z"/></svg>';
    media.appendChild(play);

    var title = document.createElement("h4");
    title.textContent = video.title;

    var sr = document.createElement("span");
    sr.className = "sr-only";
    sr.textContent = " (opens in a new tab)";
    title.appendChild(sr);

    card.appendChild(media);
    card.appendChild(title);

    card.addEventListener("click", function (event) {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button) return;
      event.preventDefault();
      playInline(card, video);
    });

    return card;
  }

  function playInline(card, video) {
    var feed = document.getElementById("youtube-feed");
    if (feed) {
      feed.querySelectorAll(".yt-card.is-playing").forEach(function (openCard) {
        if (openCard !== card) restoreCard(openCard);
      });
    }

    if (card.classList.contains("is-playing")) return;

    var media = card.querySelector(".yt-media");
    if (!media) return;
    card.dataset.thumbHtml = media.innerHTML;
    card.classList.add("is-playing");
    media.replaceChildren();

    var frame = document.createElement("iframe");
    frame.src =
      "https://www.youtube-nocookie.com/embed/" +
      encodeURIComponent(video.id) +
      "?autoplay=1&rel=0";
    frame.title = video.title;
    frame.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    frame.allowFullscreen = true;
    media.appendChild(frame);
  }

  function restoreCard(card) {
    var media = card.querySelector(".yt-media");
    if (!media || !card.dataset.thumbHtml) return;
    media.innerHTML = card.dataset.thumbHtml;
    card.classList.remove("is-playing");
    delete card.dataset.thumbHtml;
  }

  function loadFacebookPlugin(settings) {
    var plugin = section.querySelector(".fb-page");
    if (!plugin) return;

    if (settings.facebookPageUrl) {
      plugin.setAttribute("data-href", settings.facebookPageUrl);
    }

    function start() {
      var sdkReady = false;
      sizeFacebookPlugin(plugin);

      window.fbAsyncInit = function () {
        sdkReady = true;
        var params = { xfbml: true, version: "v21.0" };
        if (settings.facebookAppId) params.appId = settings.facebookAppId;
        window.FB.init(params);
        watchFacebookPlugin(plugin, settings);
      };

      var script = document.createElement("script");
      script.async = true;
      script.defer = true;
      script.crossOrigin = "anonymous";
      script.src = "https://connect.facebook.net/en_US/sdk.js";
      script.onerror = function () {
        showFacebookFallback(plugin, settings);
      };
      document.body.appendChild(script);
      setTimeout(function () {
        if (!sdkReady) showFacebookFallback(plugin, settings);
      }, 6000);

      var resizeTimer;
      window.addEventListener("resize", function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
          sizeFacebookPlugin(plugin);
          if (window.FB && window.FB.XFBML) window.FB.XFBML.parse(plugin.parentNode);
        }, 300);
      });
    }

    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              observer.disconnect();
              start();
            }
          });
        },
        { rootMargin: "240px" }
      );
      observer.observe(plugin);
    } else {
      start();
    }
  }

  function facebookPluginHeight(plugin) {
    var span = plugin.querySelector(":scope > span");
    if (span) return span.clientHeight;
    var iframe = plugin.querySelector("iframe");
    return iframe ? iframe.clientHeight : 0;
  }

  function watchFacebookPlugin(plugin, settings) {
    var tries = 0;
    var stable = 0;
    var timer = setInterval(function () {
      tries += 1;
      var iframe = plugin.querySelector("iframe");
      var rendered = plugin.getAttribute("fb-xfbml-state") === "rendered";
      var height = facebookPluginHeight(plugin);
      if (iframe && rendered && height >= 150) {
        stable += 1;
        if (stable >= 4) {
          showFacebookPlugin(plugin);
          clearInterval(timer);
        }
        return;
      }
      stable = 0;
      if (iframe && rendered && height > 0 && height < 120) {
        clearInterval(timer);
        showFacebookFallback(plugin);
        return;
      }
      if (tries >= 16) {
        clearInterval(timer);
        showFacebookFallback(plugin);
      }
    }, 400);
  }

  function showFacebookPlugin(plugin) {
    var feed = plugin.parentNode;
    plugin.classList.add("is-ready");
    plugin.classList.remove("is-unavailable");
    plugin.removeAttribute("aria-hidden");
    if (feed) feed.classList.add("is-plugin-ready");
  }

  function showFacebookFallback(plugin) {
    var feed = plugin.parentNode;
    plugin.classList.add("is-unavailable");
    plugin.classList.remove("is-ready");
    plugin.setAttribute("aria-hidden", "true");
    if (feed) feed.classList.remove("is-plugin-ready");
    var iframe = plugin.querySelector("iframe");
    if (iframe) iframe.setAttribute("hidden", "hidden");
  }

  function sizeFacebookPlugin(plugin) {
    var wrap = plugin.parentNode;
    if (!wrap) return;
    var width = Math.floor(wrap.clientWidth);
    if (width < 180) width = 180;
    if (width > 340) width = 340;
    plugin.setAttribute("data-width", String(width));
  }
})();
