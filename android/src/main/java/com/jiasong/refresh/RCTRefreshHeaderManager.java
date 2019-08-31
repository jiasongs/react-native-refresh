package com.jiasong.refresh;

import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;

public class RCTRefreshHeaderManager extends ViewGroupManager<RCTRefreshHeader> {


    @Override
    public String getName() {
        return "RCTRefreshHeader";
    }

    @Override
    protected RCTRefreshHeader createViewInstance(ThemedReactContext reactContext) {
        RCTRefreshHeader header = new RCTRefreshHeader(reactContext);
        return header;
    }




}
